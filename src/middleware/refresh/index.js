/* eslint-disable camelcase, consistent-return */
import { tryGetTransactions } from 'redux-modules/transactions/reducer';
import { tryGetBalance } from 'redux-modules/balance/reducer';

// Dispatches action after events
const refresh = store => next => (action) => {
  const triggerActions = [
    'SUCCESS_POST_TRANSACTION',
    'SUCCEED_LOGIN',
    'SUCCESS_POST_EOS_ACCOUNT',
    'ROUTE_LOAD'
  ];

  if (triggerActions.some(t => action.type === t) && store.getState().login.user) {
    const {
      login: {
        user: {
          account_name,
        }
      }
    } = store.getState();

    if (account_name) {
      const newAction = { account_name };

      store.dispatch(tryGetBalance(newAction));
      store.dispatch(tryGetTransactions(newAction));
    }
  }

  next(action);
};

export default refresh;
