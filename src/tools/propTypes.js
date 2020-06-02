import PropTypes from 'prop-types';

const ReactRouterHistory = PropTypes.shape({
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
});

const session = PropTypes.shape({
  token: PropTypes.string,
});

const company = PropTypes.shape({

});

export default {
  ReactRouterHistory,
  session,
  company,
};
