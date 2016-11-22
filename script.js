$(document).ready(function() {
	$("#button").click(function(event) {
		event.preventDefault();

		$("#derivative").remove();
		var baseFormula = $("#baseFormula").val();
		var derivative = takeDerivativeOf(baseFormula);
		var html = "<br><div id='derivative'>The derivative of [" + baseFormula + "] is {" + derivative + "}.</div><br>"
		$("#form").append(html);
	})

	function takeDerivativeOf(equation) {
		var initial_split_equation = equation.split(" ");
		console.log(initial_split_equation);
		var equation_individual_derivatives = [];
		var signs_in_order = [];
		console.log(initial_split_equation.length);
		for (i = 0; i < 3; i++) {
			console.log(i);
			if (initial_split_equation[i] != "+" || initial_split_equation[i] != "-") {
				console.log(initial_split_equation[i]);
				equation_individual_derivatives.push(internalDerivative(initial_split_equation[i]));
			} else {
				signs_in_order.push(initial_split_equation[i]);
			}
		}
		console.log(equation_individual_derivatives);
		return equation_individual_derivatives;
	}

	function internalDerivative(component) {
		var new_component = component.replace(/[()]/g, '');
		var derivative_ready = [];
		for (i = 0; i < component.length; i++) {
			if (new_component.charAt(i) == "^") {
				derivative_ready = new_component.split("^");
				console.log(derivative_ready);
			}
			if (derivative_ready[0] == "x" || derivative_ready[0] == "X") {
				derivative_ready[0] = "1";
			}
		}
		console.log(derivative_ready);
		var coefficient = Number(derivative_ready[0]) * Number(derivative_ready[1]);
		var exponent = Number(derivative_ready[1]) - 1;
		if (exponent > 1) {
			var derivative_solved = coefficient + "x^(" + exponent + ")";
			return derivative_solved;
		} else {
			var derivative_solved = coefficient + "x"
			return derivative_solved;
		}
	}
})