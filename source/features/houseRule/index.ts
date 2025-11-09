// src/features/houseRule/index.ts

// 🔹 Re-export API and hooks
export { houseRuleApi, useGetHouseRulesQuery, useDeleteHouseRuleMutation } from './houseRuleService';

// 🔹 Re-export slice reducer and actions
import houseRuleReducer, {
  addRule,
  removeRule,
  clearRules,
  setFilter,
} from './houseRuleSlice';

export {
  houseRuleReducer,
  addRule,
  removeRule,
  clearRules,
  setFilter,
};

// 🔹 Default export for reducer (optional)
export default houseRuleReducer;
