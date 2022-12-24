import * as _ from 'lodash';
import * as React from "react";
import '../../public/styles.css'
import { useEffect, useState} from 'react';
import renderTree from '../d3';
import useStore from '../../store/store';

const Tree = () => {
  const treeData = useStore((state) => state.treeComponents);
  console.log('treeData in Tree', treeData);

  //import store treeComponents from store
  // const treeComponents = useStore((state) => state.treeComponents);

  // console.log('in tree.tsx', treeComponents)

  // let tree = [];
  // tree.push(<h3>{treeComponents.appName}</h3>);
  // if (treeComponents.children) {
  //   treeComponents.children.forEach(element => {
  //     tree.push(<h4>{element}</h4>)
  //   })
  // }

  

// let result = null;
// useEffect(() => {
//   result = renderTree(treeData)
// }, [treeData])

// this will rerender one time but doesn't account for new children
let result = null;
if (treeData.name) {
  result = renderTree(treeData)
}




  return (
    <div>
      <h2>Component Tree Visualizer</h2>
      <div id="dTree">{result}</div>
    </div>

  )
}

export default Tree;