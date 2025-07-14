function createGraph1(selector, dataFilePath){

///select the division in the html file
const canvas = d3.select(".canva-graph5");

// Define initial width and height for your SVG based on the D3 example's 'width'.
// The height will be dynamically calculated by the D3 tree layout.
const initialWidth = 1500; // From the D3 example
const initialHeight = 1200; // A reasonable initial height, will be adjusted by viewBox

// Create your SVG element ONCE and append it to the canvas.
const svg = canvas.append("svg")
    .attr("width", initialWidth)
    .attr("height", initialHeight); // This height will be overwritten by viewBox


//Stratify the data for 1st graph
d3.json("Shapes-json.txt").then(function(graph1data) { // Corrected filename here
    // Log the raw flat data to see how D3 parsed it
    console.log("Flat Data from JSON:", graph1data); // Corrected log message

    // Define the stratify function

    const stratify = d3.stratify()
        .id(d => d.id) // Use the 'id' column as the unique identifier
        .parentId(d => d.parentId); // Use the 'parentId' column to define parent-child relationships

    // Create the hierarchical root node
    const root = stratify(graph1data);

    // Optionally, sum values and sort nodes (common for hierarchical layouts)
    // If you want to sum values, uncomment these lines
    // root.sum(d => +d.value) // Sum the 'value' property for all descendants. Use '+' to convert to number.
    //     .sort((a, b) => (b.value || 0) - (a.value || 0)); // Sort children by value (descending)

    console.log("Hierarchical Root Node:", root);

    //Draw the graph1
    const width = initialWidth; // Use the same width as your SVG

    // Compute the tree height.
    const dx = 19;
    const dy = width / (root.height + 2.5); // Use 'root' instead of 'root1' // adjust link length here

    // Create a tree layout.
    const tree = d3.tree().nodeSize([dx, dy]);

    // Sort the tree and apply the layout.
    root.sort((a, b) => d3.ascending(a.data.name, b.data.name));
    tree(root); // Apply the tree layout to the 'root'

    // Compute the extent of the tree. Note that x and y are swapped here
    // because in the tree layout, x is the breadth, but when displayed, the
    // tree extends right rather than down.
    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
    });

    // Compute the adjusted height of the tree.
    const height = x1 - x0 + dx * 2;

    // Introduce a left margin for the viewBox
    //const leftMargin = 150; // Adjust this value as needed to move the graph right

    // IMPORTANT MODIFICATION: Update the existing SVG's attributes.
    svg.attr("height", height) // Set the calculated height
        .attr("viewBox", [-dy/3, x0 - dx, width, height]) // generally it is -dy/3
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    // Clear any previous content if you were refreshing dynamically
    svg.selectAll("*").remove();

    const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(root.links()) // Use 'root' for links
        .join("path")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

    // Modify the node drawing section:
    const node = svg.append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("circle")
        .attr("fill", d => d.children ? "#555" : "#999")
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d.children ? -6 : 6)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name)
        .attr("stroke", "white")
        .attr("paint-order", "stroke")
        .style("font-size", "12px"); // Increased font size slightly for better readability

}).catch(function(error) {
    console.error("Error loading or processing JSON:", error); // Corrected log message
});
}
createGraph1(".canva-graph5", "Shapes-json.txt");



//function to create graph 2
function createGraph2(selector, dataFilePath){

const canvas = d3.select(".canva-graph6")

// Define initial width and height for your SVG based on the D3 example's 'width'.
// The height will be dynamically calculated by the D3 tree layout.
const initialWidth = 1500; // From the D3 example
const initialHeight = 1200; // A reasonable initial height, will be adjusted by viewBox

const svg = canvas.append("svg")
    .attr("width", initialWidth)
    .attr("height", initialHeight)

//Stratify the data for 1st graph
d3.json("Shapes-IS-SC-json.txt").then(function(graph2data) { // Corrected filename here
    // Log the raw flat data to see how D3 parsed it
    console.log("Flat Data from JSON:", graph2data); // Corrected log message

    // Define the stratify function
    const stratify = d3.stratify()
        .id(d => d.id) // Use the 'id' column as the unique identifier
        .parentId(d => d.parentId); // Use the 'parentId' column to define parent-child relationships

    // Create the hierarchical root node
    const root = stratify(graph2data);

    // Optionally, sum values and sort nodes (common for hierarchical layouts)
    // If you want to sum values, uncomment these lines
    // root.sum(d => +d.value) // Sum the 'value' property for all descendants. Use '+' to convert to number.
    //     .sort((a, b) => (b.value || 0) - (a.value || 0)); // Sort children by value (descending)

    console.log("Hierarchical Root Node:", root);

    //Draw the graph1
    const width = initialWidth; // Use the same width as your SVG

    // Compute the tree height.
    const dx = 18;
    const dy = width / (root.height + 3); // Use 'root' instead of 'root1' // adjust link length here

    // Create a tree layout.
    const tree = d3.tree().nodeSize([dx, dy]);

    // Sort the tree and apply the layout.
    root.sort((a, b) => d3.ascending(a.data.name, b.data.name));
    tree(root); // Apply the tree layout to the 'root'

    // Compute the extent of the tree. Note that x and y are swapped here
    // because in the tree layout, x is the breadth, but when displayed, the
    // tree extends right rather than down.
    let x0 = Infinity;
    let x1 = -x0;
    root.each(d => {
        if (d.x > x1) x1 = d.x;
        if (d.x < x0) x0 = d.x;
    });

    // Compute the adjusted height of the tree.
    const height = x1 - x0 + dx * 2;

    // Introduce a left margin for the viewBox
    const leftMargin = 200; // Adjust this value as needed to move the graph right

    // IMPORTANT MODIFICATION: Update the existing SVG's attributes.
    svg.attr("height", height) // Set the calculated height
        .attr("viewBox", [-200, x0 - dx, width, height]) // generally it is -dy/3
        .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif;");

    // Clear any previous content if you were refreshing dynamically
    svg.selectAll("*").remove();

    const link = svg.append("g")
        .attr("fill", "none")
        .attr("stroke", "#555")
        .attr("stroke-opacity", 0.4)
        .attr("stroke-width", 1.5)
        .selectAll("path")
        .data(root.links()) // Use 'root' for links
        .join("path")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

    // Modify the node drawing section:
      const node = svg.append("g")
        .attr("stroke-linejoin", "round")
        .attr("stroke-width", 3)
        .selectAll("g")
        .data(root.descendants())
        .join("g")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    node.append("circle")
        .attr("fill", d => d.children ? "#555" : "#999")
        .attr("r", 2.5);

    node.append("text")
        .attr("dy", "0.31em")
        .attr("x", d => d.children ? -6 : 6)
        .attr("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name)
        .attr("stroke", "white")
        .attr("paint-order", "stroke")
        .style("font-size", "10px"); // Increased font size slightly for better readability

}).catch(function(error) {
    console.error("Error loading or processing JSON:", error); // Corrected log message
})
}
createGraph2(".canva-graph6", "Shapes-IS-SC.txt");