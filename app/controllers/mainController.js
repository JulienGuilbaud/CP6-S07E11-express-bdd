const mainController = {
  notFound: function(req, res) {
    res.status(404).render('not-found');
  }
}

export default mainController;