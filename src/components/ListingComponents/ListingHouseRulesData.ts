export interface HouseRule {
  inputProps: {
    id: string;
    name: string;
  };
  icon: string;
  description: string;
  checked?: boolean;
}

export const ListingHouseRulesData: HouseRule[] = [
  {
    inputProps: { id: 'no-smoking', name: 'no-smoking' },
    icon: '/icons/no-smoking.png',
    description: 'No smoking',
    checked: false,
  },
  {
    inputProps: { id: 'no-parties', name: 'no-parties' },
    icon: '/icons/no-parties.png',
    description: 'No parties',
    checked: false,
  },
  {
    inputProps: { id: 'quiet-hours', name: 'quiet-hours' },
    icon: '/icons/quiet-hours.png',
    description: 'Quiet hours after 10pm',
    checked: false,
  },
  {
    inputProps: { id: 'check-out', name: 'check-out' },
    icon: '/icons/check-out.png',
    description: 'Check-out before 11AM',
    checked: false,
  },
  {
    inputProps: { id: 'no-pets', name: 'no-pets' },
    icon: '/icons/no-pets.png',
    description: 'No pets',
    checked: false,
  },
  {
    inputProps: { id: 'no-events', name: 'no-events' },
    icon: '/icons/no-events.png',
    description: 'No events',
    checked: false,
  },
  {
    inputProps: { id: 'no-late-check-in', name: 'no-late-check-in' },
    icon: '/icons/no-late-check-in.png',
    description: 'No check-in after 8PM',
    checked: false,
  },
  {
    inputProps: { id: 'no-rearranging', name: 'no-rearranging' },
    icon: '/icons/no-rearranging.png',
    description: 'No rearranging of furniture',
    checked: false,
  },
];
