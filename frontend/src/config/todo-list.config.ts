import localforage from 'localforage'

const todoListConfig = {
  COLOR_SCHEME: '(prefers-color-scheme: dark)',
  LOGIN_TYPING_SEQUENCE: [
    '',
    500,
    'to',
    1000,
    '',
    1000,
    'to-do',
    1000,
    '',
    1000,
    'to-do-list',
    500,
    ''
  ],
  PROPAGATE_LOADER_COLOR_LIGHT: '#000',
  PROPAGATE_LOADER_COLOR_DARK: '#fff',
  PROPAGATE_TYPING_SEQUENCE: [
    'Authenticating',
    1000,
    'Authenticating.',
    1000,
    'Authenticating..',
    1000,
    'Authenticating...',
    1000
  ],
  TAB_CHOICES: [
    { value: 'todo', label: 'To Do' },
    { value: 'progress', label: 'On Progress' },
    { value: 'done', label: 'Done' }
  ],
  ACTIVITY_STATUS: [
    { value: -1, label: 'To Do' },
    { value: 0, label: 'On Progress' },
    { value: 1, label: 'Done' }
  ],
  LOCAL_FORAGE: {
    driver: [
      localforage.INDEXEDDB,
      localforage.WEBSQL,
      localforage.LOCALSTORAGE
    ],
    name: 'to-do-list',
    storeName: 'auth',
    description: 'Storage for application authentication data.'
  }
}

export default todoListConfig
