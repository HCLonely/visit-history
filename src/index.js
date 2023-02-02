const store = require('store');

var visitHistory = {
  set: ({ data, identifier = () => window.location.pathname, limit = 20 }) => {
    if (typeof limit !== 'number') {
      console.error(`[hexo-history] Type error: limit should be number.`);
    }
    const history = (Array.isArray(store.get('visit-history')) ? store.get('visit-history') : [])
      .slice(0 - limit).filter((post) => post.identifier !== identifier());
    data.identifier = identifier();
    data.visitTime = Date.now()

    history.push(data);
    store.set('visit-history', history);
  },
  get: ({ htmlTemplate, limit } = {}) => (Array.isArray(store.get('visit-history')) ? store.get('visit-history') : [])
    .slice(0 - limit).sort((b, a) => a.visitTime - b.visitTime)
    .map((post) => htmlTemplate ? htmlTemplate.replace(/\{\{([\w]+?)\}\}/g, (matcher, name) => post[name.trim()]) : post)
}

module.exports = {
  default: visitHistory,
  visitHistory
};
