var puts;
(function(puts) {
    puts.Error = Error;
    puts.TypeError = TypeError;
    puts.ReferenceError = ReferenceError;
    puts.ParseError = ParseError;
    puts.EvalError = EvalError;
    puts.URIError = URIError;
    puts.SyntaxError = SyntaxError;
})(puts || (puts = {}));
