class Cultome
  def hello
    'Hola! Me llamo Carlos!'
  end

  alias_method :hola, :hello

  def to_json
    {
      name: 'Carlos Soria',
      github_user: 'cultome',
      working_at: 'Aleph',
      techs: ['ruby'],
    }
  end

  alias_method :as_json, :to_json

  def help
    <<~TEXT
      Esta es mi pagina personal contiene informacion sobre mi basicamente.

      ¿Porque una terminal? Siempre me han gustado las interfaces de texto asi que me parecio natural.

      Estas ejecutando Ruby en tu navegador usando WASM, asi que no podras hackear un servidor ajeno, pero eres libre de explorar el contexto que arme para ti.

      Requires algo de conocimiento de Ruby para jugar correctamente, pero si eres de los TLDR; solo teclea *to_json*.

      Ojala te diviertas conociendome.

      Saludos
    TEXT
  end
end

@obj = Cultome.new
