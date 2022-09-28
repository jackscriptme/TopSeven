import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import SecurityIcon from '@mui/icons-material/Security';

const navigations = [
  { path: '/settings', text: 'Account', icon: ManageAccountsIcon },
  { path: '/settings/general', text: 'General', icon: SettingsSuggestIcon },
  { path: '/settings/security', text: 'Security', icon: SecurityIcon },
];

export default navigations;
