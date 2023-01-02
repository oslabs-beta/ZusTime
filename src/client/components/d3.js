import * as d3 from 'd3';

// any invocation of this function will append the dom

function renderTree(treeData) {
  // let treeData = {
  //   name: 'Zustime',
  //   children: [
  //     {
  //       name: 'Samantha',
  //       children: [{ name: 'Lucas' }],
  //     },
  //     {
  //       name: 'Kelsey',
  //       children: [{ name: 'Tuna' }],
  //     },
  //     {
  //       name: 'Jackie',
  //       children: [
  //         { name: 'Martin', children: null },
  //         { name: 'Please adopt a second cat' },
  //       ],
  //     },
  //     {
  //       name: 'Sylvia',
  //       children: [{ name: 'Cassie' }],
  //     },
  //   ],
  // };

  //Set dimensions and margins of the diagram
  let margin = { top: 20, right: 90, bottom: 30, left: 90 },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

  //append the svg object to the body of the page
  //appends a 'group' element to 'svg'
  //moves the 'group' element to the left margin
  let svg = d3
    .select('body')
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  let i = 0,
    duration = 750,
    root;

  //declares a tree layout and assigns the size
  let treemap = d3.tree().size([height, width]);

  //assigns parent, child, height, depth
  //d3.hierarchy(data,[children])
  //used to construct a root node data from a given hierarchial data
  //data MUST be of an object and represent a root node
  //returns an array of object(s)
  root = d3.hierarchy(
    treeData,
    function (
      d //data.children
    ) {
      //shows all children on level 1 then level 2 and so on... excluding node
      // console.log(d.children);
      return d.children;
    }
  );
  root.x0 = height / 2;
  root.y0 = 0;

  //collapse after the 2nd lvl
  root.children.forEach(collapse);

  // invokes function to create component hierarchy tree!
  update(root);

  //collapse the node and all it's chilren
  function collapse(d) {
    //if data has children
    if (d.children) {
      d._children = d.children;
      //recursively call function until no more children
      d._children.forEach(collapse);
      //set children as null for collapse
      //children will not appear
      d.children = null;
    }
  }

  function update(source) {
    //assigns the x and y position for the nodes
    let treeData = treemap(root);

    //compute the new tree layout
    //links excludes the root
    //this function does not accept any parameters
    //used to generate and return an array of descendant nodes
    let nodes = treeData.descendants(),
      links = treeData.descendants().slice(1);

    //normalize for fixed-depth
    nodes.forEach(function (d) {
      d.y = d.depth * 180;
    });

    //NODES SECTION

    //updates the nodes
    let node = svg.selectAll('g.node').data(nodes, function (d) {
      return d.id || (d.id = ++i);
    });

    //enter any new modes at the parent's previous position
    //enter is used to create the missing elements and return the enter selection
    let nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', function (d) {
        return 'translate(' + source.y0 + ',' + source.x0 + ')';
      })
      .on('click', click);

    //add circle for the nodes
    nodeEnter
      .append('circle')
      .attr('class', 'node')
      .attr('r', 1e-6)
      .style('fill', function (d) {
        return d._children ? 'lightsteelblue' : '#fff';
      });

    //add labels forthe nodes
    nodeEnter
      .append('text')
      .attr('dy', '.35em')
      .attr('x', function (d) {
        return d.children || d._children ? -13 : 13;
      })
      .attr('text-anchor', function (d) {
        return d.children || d._children ? 'end' : 'start';
      })
      .text(function (d) {
        return d.data.name;
      });

    //UPDATE
    //any updates to nodeEnter and node will be applied in nodeUpdate
    let nodeUpdate = nodeEnter.merge(node);

    //transition to the proper position for the node
    nodeUpdate
      .transition()
      .duration(duration)
      .attr('transform', function (d) {
        return 'translate(' + d.y + ',' + d.x + ')';
      });

    //update the node attributes and style
    nodeUpdate
      .select('circle.node')
      .attr('r', 10)
      .style('fill', function (d) {
        return d._children ? 'lightsteelblue' : '#fff';
      })
      .attr('cursor', 'pointer');

    //remove any exiting nodes
    let nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr('transform', function (d) {
        return 'translate(' + source.y + ',' + source.x + ')';
      })
      .remove();

    //on exit reduce the node circle size to 0
    nodeExit.select('circle').attr('r', 1e-6);

    //on exit reduce the opacity of text labels
    nodeExit.select('text').style('fill-opacity', 1e-6);

    //LINKS SECTION

    //update the links
    let link = svg.selectAll('path.link').data(links, function (d) {
      return d.id;
    });

    //enter any new links at the parent's previous position
    let linkEnter = link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('d', function (d) {
        let o = { x: source.x0, y: source.y0 };
        return diagonal(o, o);
      });

    //UPDATE
    let linkUpdate = linkEnter.merge(link);

    //transition back to the parent element position
    linkUpdate
      .transition()
      .duration(duration)
      .attr('d', function (d) {
        return diagonal(d, d.parent);
      });

    //remove any exiting links
    let linkExit = link
      .exit()
      .transition()
      .duration(duration)
      .attr('d', function (d) {
        let o = { x: source.x, y: source.y };
        return diagonal(o, o);
      })
      .remove();

    //store the old positions for transition
    nodes.forEach(function (d) {
      d.x0 = d.x;
      d.y0 = d.y;
    });

    //creates a curved(diagonal) path from parent to the child nodes
    function diagonal(s, d) {
      let path = `M ${s.y} ${s.x}
                    C ${(s.y + d.y) / 2} ${s.x},
                      ${(s.y + d.y) / 2} ${d.x},
                      ${d.y} ${d.x}`;

      return path;
    }

    //toggle children on click
    function click(event, d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
  }
}

export default renderTree;
