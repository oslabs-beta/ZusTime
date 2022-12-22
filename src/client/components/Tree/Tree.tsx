import * as _ from 'lodash';
import * as React from "react";
import useStore from "../../store/store";
import '../../public/styles.css'


const Tree = () => {
  //import store treeComponents from store
  const treeComponents = useStore((state) => state.treeComponents);

  console.log('in tree.tsx', treeComponents)

  let tree = [];
  tree.push(<h3>{treeComponents.appName}</h3>);
  if (treeComponents.children) {
    treeComponents.children.forEach(element => {
      tree.push(<h4>{element}</h4>)
    })
  }

  return (
    <div>
      <h1>Component Tree Visualizer</h1>
      {tree}
    </div>

  )
}

export default Tree;