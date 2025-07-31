import { Amenity } from './ListAmenity';

export const ListingHouseRulesData: Amenity[] = [
    {
        input: { id: 'no-smoking', name: 'no-smoking', checked: false },
        icon: '/icons/no-smoking.png',
        description: 'No smoking',
    },
    {
        input: { id: 'no-parties', name: 'no-parties', checked: false },
        icon: '/icons/no-parties.png',
        description: 'No parties',
    },
    {
        input: { id: 'quiet-hours', name: 'quiet-hours', checked: false },
        icon: '/icons/quiet-hours.png',
        description: 'Quiet hours after 10pm',
    },
    
    {
        input: { id: 'check-out', name: 'check-out', checked: false },
        icon: '/icons/check-out.png',
        description: 'Check-out before 11AM',
    },
    {
        input: { id: 'no-pets', name: 'no-pets', checked: false },
        icon: '/icons/no-pets.png',
        description: 'No pets',
    },
    {
        input: { id: 'no-events', name: 'no-events', checked: false },
        icon: '/icons/no-events.png',
        description: 'No events',
    },
    {
        input: { id: 'no-late-check-in', name: 'no-late-check-in', checked: false },
        icon: '/icons/no-late-check-in.png',
        description: 'No check-in after 8PM',
    },
    {
        input: { id: 'no-rearranging', name: 'no-rearranging', checked: false },
        icon: '/icons/no-rearranging.png',
        description: 'No rearranging of furniture',
    },
];
