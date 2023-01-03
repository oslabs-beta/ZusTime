import * as _ from 'lodash';
import * as React from "react";
import '../../public/styles.css'
import { useEffect } from 'react';
import renderTree from '../d3';
import useStore from '../../store/store';

const Tree = ({ setComponent, component }) => {
  const treeData = useStore((state) => state.treeComponents);
  let result = null;

  // only happens after the initial mount
  useEffect(() => {
    setComponent(false);
  }, [])

  // listens for if there is tree data and if component state is at 0 aka first mount 
  if (treeData.name && component) {
    result = renderTree(treeData)
  }


  return (
    <div id="dTree">
      <h2>Component Tree Visualizer</h2>
      <div>{result}</div>
    </div>

  )
}

export default Tree;