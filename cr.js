var CR = (function (CR){
  
  // Constructor
  CR.CodeReader = function (content) {
    this.setCode(content);
  };

  Object.defineProperties(CR.CodeReader.prototype, {
    getCode : {
      value : function () {
        return this.code;
      } 
    },

    setCode : {
      value : function (content) {
        content = content
          .replace(/(\n{3,})/ig, '\n\n')    // replace more than two new lines just two
          .replace(/(\s+)/ig, '\s');        // replace multiple spaces with single

        this.currentLine = 0;
        this.linesList = content.split("\n");
        this.lines = this.linesList.length;
        this.code = content;
      }
    },

    line : {
      value : function (number) {
        if (!!number && !!this.linesList[number]) {
          this.currentLine = number;
          return this.linesList[number];
        }
        return this.linesList[this.currentLine];
      }
    },

    prev : {
      value : function () {
        return this.linesList[(this.currentLine - 1)];
      }
    },

    next : {
      value : function () {
        return this.linesList[(this.currentLine + 1)];
      }
    }

  });

  CR.CodeScope = function ( content, wrappers ) {
    this.scopeWrappers(wrappers);
  };

  Object.defineProperties(CR.CodeScope.prototype, {
    setScope : {
      values : function (content) {
        this.content = content;
      }
    },

    scopeWrappers : {
      value : function (type, values) {
        this.wrappers = this.wrappers || {};

        if (typeof type == "object") {
          this.extendWrappers(type);
          return ;
        }

        if (typeof type == "string" && typeof values == "array") {
          this.wrappers[type] = values;
        }
      }
    },

    extendWrappers : {
      value : function (wrappers) {
        for (var type in wrappers) {
          this.wrappers[type] = wrappers[type];
        }
      }
    },

    renderScopes : {
      value : function () {

      }
    }
  });

  return CR;
}(CR || {}));

CodeReader = CR.CodeReader;

var codeReader = new CodeReader("test");

console.log(codeReader.getCode());
