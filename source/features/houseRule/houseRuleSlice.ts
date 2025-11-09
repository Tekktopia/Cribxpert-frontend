import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HouseRuleData } from '@/features/houseRule/houseRuleService';

// 🎯 Slice state type
interface HouseRuleState {
  selectedRules: HouseRuleData[];
  filter: string;
}

// 🏁 Initial state
const initialState: HouseRuleState = {
  selectedRules: [],
  filter: '',
};

// 🧩 Create the slice
export const houseRuleSlice = createSlice({
  name: 'houseRule',
  initialState,
  reducers: {
    // Add a selected rule
    addRule: (state, action: PayloadAction<HouseRuleData>) => {
      const exists = state.selectedRules.some(r => r._id === action.payload._id);
      if (!exists) {
        state.selectedRules.push(action.payload);
      }
    },
    // Remove a selected rule
    removeRule: (state, action: PayloadAction<string>) => {
      state.selectedRules = state.selectedRules.filter(r => r._id !== action.payload);
    },
    // Clear all selected rules
    clearRules: (state) => {
      state.selectedRules = [];
    },
    // Optional: filter UI state
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

// ✅ Export actions
export const { addRule, removeRule, clearRules, setFilter } = houseRuleSlice.actions;

// ✅ Export reducer
export default houseRuleSlice.reducer;
