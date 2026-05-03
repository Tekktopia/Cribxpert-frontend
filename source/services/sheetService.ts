const SHEET_ID = import.meta.env.VITE_SHEET_ID;

export interface SheetRow {
  id: string;
  question: string;
  answer: string;
  section: string;
  isactive: boolean;
  order: number;
}

let cache: SheetRow[] | null = null;

export async function fetchSheetData(sheetName = "Sheet1"): Promise<SheetRow[]> {
  if (cache) return cache;

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    const text = await res.text();
    
    const jsonString = text.replace('/*O_o*/', '').replace('google.visualization.Query.setResponse(', '').slice(0, -2);
    const json = JSON.parse(jsonString);
    
    console.log('🔍 Raw API response:', json);

    if (json.status === 'error') {
      throw new Error(`Sheet error: ${json.errors?.[0]?.detailed_message || 'Unknown error'}`);
    }

    if (!json.table || !json.table.rows || json.table.rows.length === 0) {
      console.warn('⚠️ Sheet is empty or has no data rows');
      return [];
    }

    const headers = json.table.cols.map((col: any) => 
      (col.label || col.id || '').toLowerCase().trim()
    );
    
    console.log('📋 Headers from sheet:', headers);

    // FIX: Get all rows first
    const allRows = json.table.rows.map((row: any, index: number) => {
      const values = row.c?.map((cell: any) => {
        if (cell === null || cell === undefined) return '';
        return (cell.v?.toString() ?? '').trim();
      }) || [];
      
      const obj: Record<string, string> = {};
      headers.forEach((header: string, i: number) => {
        obj[header] = values[i] || '';
      });

      return obj;
    });

    console.log('📦 All rows (including header):', allRows);

    // FIX: Skip the first row if it's the header row
    // Check if the first row contains the actual headers as values
    const startIndex = allRows.length > 0 && 
      (allRows[0].id?.toLowerCase() === 'id' || 
       allRows[0].question?.toLowerCase() === 'question') ? 1 : 0;

    console.log(`📌 Starting from row index: ${startIndex}`);

    // FIX: Only process data rows (skip header)
    const formatted = allRows.slice(startIndex).map((obj, index) => {
      const faqRow = {
        id: obj.id || `faq-${index}`,
        question: obj.question || '',
        answer: obj.answer || '',
        section: obj.section || 'General',
        // FIX: Default to true if isActive is empty or not set
        isactive: obj.isactive === '' || obj.isactive === undefined || obj.isactive === null 
          ? true  // Default to active if not specified
          : obj.isactive?.toLowerCase() === 'true' || 
            obj.isactive === '1' || 
            obj.isactive?.toLowerCase() === 'yes',
        order: Number(obj.order) || index + 1,
      };

      console.log(`✅ FAQ ${index + 1}:`, {
        question: faqRow.question,
        section: faqRow.section,
        isactive: faqRow.isactive,
        isActiveRaw: obj.isactive
      });

      return faqRow;
    });

    console.log('✅ Formatted FAQs:', formatted);
    
    if (formatted.length > 0) {
      cache = formatted;
    }
    
    return formatted;
  } catch (error) {
    console.error('❌ fetchSheetData error:', error);
    throw error;
  }
}

export function clearCache(): void {
  cache = null;
  console.log('🔄 Cache cleared');
}

export async function fetchBySection(section: string): Promise<SheetRow[]> {
  const all = await fetchSheetData();
  return all
    .filter((row) => row.section.toLowerCase() === section.toLowerCase())
    .sort((a, b) => a.order - b.order);
}

export async function fetchActiveFAQs(): Promise<SheetRow[]> {
  const all = await fetchSheetData();
  return all.filter((row) => row.isactive);
}