import PropTypes from 'prop-types';

const history = PropTypes.shape({
  push: PropTypes.func,
});

const company = PropTypes.shape({
  _id: PropTypes.string,
  country: PropTypes.string,
  domain: PropTypes.string,
  industry: PropTypes.string,
  name: PropTypes.string,
  phone: PropTypes.string,
  type: PropTypes.string,
  website: PropTypes.string,
  ourRelation: PropTypes.shape({
    company: PropTypes.string,
    relation: PropTypes.shape({}),
  }),
});

const user = PropTypes.shape({
  company,
});

const session = PropTypes.shape({
  token: PropTypes.string,
  user,
});

const notifications = PropTypes.shape({

});

const event = PropTypes.shape({

});

const chat = PropTypes.shape({
});

const ScreenProptypes = PropTypes.shape({
  history,
});

const socket = PropTypes.shape({

});

export default {
  ScreenProptypes,
  history,
  session,
  notifications,
  company,
  event,
  chat,
  socket,
};
