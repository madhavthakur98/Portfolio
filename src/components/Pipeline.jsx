import { Fragment } from 'react'
import { pipeline } from '../data/profile.js'
import './Pipeline.css'

// The signature element: a live RAG pipeline schematic with
// data packets pulsing from node to node.
export default function Pipeline() {
  return (
    <figure className="pipeline">
      <div
        className="pipeline-track"
        role="img"
        aria-label={`Pipeline diagram: ${pipeline.nodes.join(', then ')}`}
      >
        {pipeline.nodes.map((node, i) => (
          <Fragment key={node}>
            {i > 0 && (
              <span className="pipeline-link" aria-hidden="true">
                <span
                  className="pipeline-packet"
                  style={{ animationDelay: `${(i - 1) * 0.55}s` }}
                />
              </span>
            )}
            <span
              className={`pipeline-node mono${node === 'vector db' ? ' pipeline-node--hot' : ''}`}
            >
              {node}
            </span>
          </Fragment>
        ))}
      </div>
      <figcaption className="pipeline-caption mono">{pipeline.caption}</figcaption>
    </figure>
  )
}
