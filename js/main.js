var result = "hello";

(async () => {
  const { DefaultRubyVM } = window["ruby-wasm-wasi"];
  const response = await fetch("https://cdn.jsdelivr.net/npm/@ruby/3.3-wasm-wasi@2.5.0/dist/ruby+stdlib.wasm");
  const module = await WebAssembly.compileStreaming(response);
  const { vm } = await DefaultRubyVM(module);
  const sourceCode = await fetch("/cultome.rb");
  const code = await sourceCode.text()

  vm.eval(`
    require "js"

    ${code}
  `);

  var promptCount = 1;

  function focusInput() {
    let userInput = document.querySelector("#userInput").focus();
  }

  function execute() {
    let userInput = document.querySelector("#userInput").value;
    document.querySelector("#userInput").value = "";

    if (userInput.includes("\"")) {
      userInput = userInput.replaceAll("\"", "\"\"");
    }

    try {
      vm.eval(`
        result = @obj.instance_eval "${userInput}"

        if result.is_a? Array
          JS.global[:result] = result.join("\n")
        else
          JS.global[:result] = result.to_s
        end
      `);
    } catch(error) {
      console.log(error);

      result = "Sorry, that's not valid. Try again!";
    }

    let cmd = document.createElement("div");
    cmd.innerText = `irb(cultome):${String(promptCount).padStart(3, "0")}> ${userInput}`;

    let res = document.createElement("div");
    res.innerText = `=> ${result}`;
    result = '';

    let br = document.createElement("br");

    document.querySelector("#cmds").appendChild(cmd);
    document.querySelector("#cmds").appendChild(res);
    document.querySelector("#cmds").appendChild(br);

    promptCount += 1;
    setPrompt();

    return false;
  }

  function setPrompt() {
    document.querySelector("#prompt").innerText = `irb(cultome)${String(promptCount).padStart(3, "0")}>`;
  }

  window.addEventListener("click", focusInput);
  document.querySelector("#console").addEventListener("submit", execute);
  document.querySelector("#userInput").addEventListener("blur", focusInput);

  document.onload = setPrompt();
})();
