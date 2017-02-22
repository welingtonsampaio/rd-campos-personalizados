import $ from 'jquery';
import Auth from 'j-toker';

class Request {
  constructor() {
    this.setMethod('GET');
  }

  /**
   * Configura a url a ser acessado
   * @param {String} u
   * @return {Request} self-instance
   */
  setUrl(u) {
    this.url = `${Auth.getApiUrl()}${u}`;
    return this;
  }

  /**
   * Define o metodo da requisição
   * @param {String} m
   * @return {Request} self-instance
   */
  setMethod(m) {
    this.method = m.toLowerCase();
    return this;
  }

  /**
   * Configura as informações que serão enviados por ajax
   * @param {String} d
   * @return {Request} self-instance
   */
  setData(d) {
    this.data = d;
    return this;
  }

  /**
   * Executa a requisição com as configurações feitas
   * @return {Promise} Promise da requisição
   */
  do() {
    return $.when(
      $.ajax({
        url: this.url,
        method: this.method,
        data: this.data,
        dataType: 'json'
      })
    );
  }
}

export default Request
