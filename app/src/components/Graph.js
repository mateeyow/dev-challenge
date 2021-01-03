import React, { useRef, useCallback } from 'react'
import { ForceGraph3D } from 'react-force-graph'
import SpriteText from 'three-spritetext'
import PropTypes from 'prop-types'
import { withSize } from 'react-sizeme'

const Graph = ({ data, size }) => {
  const fgRef = useRef()

  const handleNodeClick = useCallback((node) => {
    // Aim at node from outside it
    const distance = 100
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z)

    fgRef.current.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio },
      node,
      1000,
    )
  }, [fgRef])

  return (
    <ForceGraph3D
      ref={fgRef}
      onNodeClick={handleNodeClick}
      width={size.width}
      height={size.height}
      graphData={data}
      nodeRelSize={8}
      nodeLabel="id"
      nodeAutoColorBy="group"
      linkThreeObjectExtend
      linkDirectionalArrowLength={4}
      linkDirectionalArrowRelPos={1}
      linkDirectionalParticles={1}
      linkThreeObject={(link) => {
        const sprite = new SpriteText(`${link.type}`)
        sprite.color = 'lightgrey'
        sprite.textHeight = 3
        return sprite
      }}
      linkPositionUpdate={(sprite, { start, end }) => {
        const middlePos = Object.assign(...['x', 'y', 'z'].map((c) => ({
          [c]: start[c] + (end[c] - start[c]) / 2,
        })))

        Object.assign(sprite.position, middlePos)
      }}
      nodeThreeObject={(node) => {
        const sprite = new SpriteText(node.name)
        sprite.color = node.color
        sprite.textHeight = 5
        return sprite
      }}
    />
  )
}

Graph.propTypes = {
  data: PropTypes.object,
  size: PropTypes.object,
}
export default withSize({ monitorHeight: true })(Graph)
