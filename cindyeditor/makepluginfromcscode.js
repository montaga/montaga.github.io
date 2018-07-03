/*jshint esversion: 6 */

function makepluginfromcscode(codes, name) {
    console.log(`generating a plugin called ${name}, including the functions ${Object.keys(codes).map(script => `${name}${script}()`).join(', ')}`);
    CindyJS.registerPlugin(1, name, function(api) {
        function runcs(code) {
            api.evaluate({
                "ctype": "function",
                "oper": "parse$1",
                "args": [{
                    "ctype": "string",
                    "value": code
                }],
                "modifs": {}
            });
            //console.log(code);
        }

        for (var script in codes) {
            runcs(`${name}${script}():= (
              ${codes[script]}
          );`);
        }
    });
}
