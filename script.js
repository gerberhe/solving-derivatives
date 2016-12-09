$(document).ready(function() {
	$("#button").click(function(event) {
		event.preventDefault();

		$("#derivative").remove();
		$("#dr_br1").remove();
		$("#dr_br2").remove();
		var baseFormula = $("#baseFormula").val();
		var derivative = takeDerivativeOf(baseFormula);
		console.log(derivative);
		if (derivative == null) {
			var html = "<br id='dr_br1><div id='derivative'>Sorry, that format is incorrect. Please try again.</div><br id='dr_br2>"
		} else {
			var html = "<br id='dr_br1'><div id='derivative'>The derivative of [" + baseFormula + "] is {" + derivative[0] + "}. The y-coordinates of the derivative graph from -5 <= x <= 5 are as follows: (" + derivative[1] + ").</div><br id='dr_br2'>"
		}
		$("#form").append(html);
	})

	function takeDerivativeOf(equation) {
		var initial_split_equation = equation.split(" ");
		console.log(initial_split_equation);
		var equation_individual_components = [];
		var signs_in_order = [];
		console.log(initial_split_equation.length);
		for (i = 0; i < initial_split_equation.length; i++) {
			if (initial_split_equation[i] != "+" && initial_split_equation[i] != "-") {
				console.log(initial_split_equation[i]);
				equation_individual_components.push(initial_split_equation[i]);
			} else {
				signs_in_order.push(initial_split_equation[i]);
			}
		}
		console.log(signs_in_order);
		var solved_derivatives = internalDerivative(equation_individual_components);
		console.log(solved_derivatives);
		var graphValues = getGraphValues(solved_derivatives, signs_in_order);
		console.log(graphValues);
		var all_information = [];
		all_information.push(combine_to_equation(solved_derivatives, signs_in_order));
		all_information.push(graphValues);
		return all_information;
	}

	function internalDerivative(components) {
		var solved = [];
		for (i = 0; i < components.length; i++) {
			var new_component = components[i].replace(/[()]/g, '');
			var derivative_ready = [];
			if (components[i].indexOf("^") >= 0) {
				for (x = 0; x < new_component.length; x++) {
					derivative_ready = new_component.split("^");
					if (derivative_ready[0].length >= 2) {
						var derivative_ready_2 = derivative_ready.join("").toLowerCase().split("x");
						derivative_ready = derivative_ready_2;
					} else if (derivative_ready[0] == "x" || derivative_ready[0] == "X") {
						derivative_ready[0] = "1";
					}
				}
				var coefficient = Number(derivative_ready[0]) * Number(derivative_ready[1]);
				var exponent = Number(derivative_ready[1]) - 1;
				if (exponent > 1) {
					var component_solved = coefficient + "x^(" + exponent + ")";
					solved.push(component_solved);
				} else {
					var component_solved = coefficient + "x";
					solved.push(component_solved);
				}
			} else if (components[i].indexOf("x") >= 0) {
				var baseSplit = components[i].split("x");
				console.log(baseSplit);
				solved.push(baseSplit[0]);
			} else {
				//do nothing
			}	
		}
		return solved;
	}

	function combine_to_equation(components, signs) {
		var combined_array = []
		if (components.length == 1) {
			return components.join("");
		} else {
			for (i = 0; i < components.length; i++) {
				if (components[i + 1] != null) {
					combined_array.push(components[i]);
					combined_array.push(signs[i]);
				} else {
					combined_array.push(components[i]);
				}
				
			}	
		}
		var complete = combined_array.join(" ");
		if (complete == null) {
			return "incorrect";
		} else {
			return complete;
		}
	}

	function getGraphValues (derivatives, signs) {
		var calculated_values = [];
		for (i = 0; i < derivatives.length; i++) {
			if (derivatives[i].toLowerCase().indexOf("x") >= 0) {
				calculated_values.push([]);
			}
		}
		var temp_inital = [];
		var final_values = [];
		for (i = 0; i < derivatives.length; i++) {
			if (derivatives[i].indexOf("^") >= 0) {
				temp_inital = derivatives[i].replace(/[()x]/g, '');
				var temp = temp_inital.split("^");
				for (x = -5; x < 6; x++) {
					var coefficient = temp[0];
					var exponent = temp[1];
					var temp_calculated = Math.pow(x, exponent);
					var final_calculated = temp_calculated * coefficient;
					calculated_values[i].push(final_calculated);
				}
			} else if (derivatives[i].toLowerCase().indexOf("x") >= 0) {
				temp = derivatives[i].toLowerCase().split("x");
				for (x = -5; x < 6; x++) {
					calculated_values[i].push(x * temp[0]);
				}
			}
		}
		var temp_final = 0;
		console.log(calculated_values);
		if (derivatives.length >= 2 && derivatives[1].toLowerCase().indexOf("x") >= 0) {
			for (n = 0; n < 11; n++) {
				var temp_final_calculated = calculated_values[0][n];
				console.log(temp_final_calculated);
				for (m = 0; m < signs.length; m++) {
					if (signs[m] == "+" && calculated_values[m+1] != null) {
						temp_final_calculated = temp_final_calculated + calculated_values[m + 1][n];
					} else if (signs[m] == "-" && calculated_values[m+1] != null) {
						temp_final_calculated = temp_final_calculated - calculated_values[m + 1][n];
					}
				}
				final_values.push(temp_final_calculated);
			}
			return final_values;
		} else {
			return calculated_values[0];
		}
	}
})