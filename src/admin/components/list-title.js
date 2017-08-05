import React from 'react'
import { translate } from 'admin-on-rest'

export default translate(({ translate, resource }) => {
  const title = translate(`resources.${resource}.name`, { smart_count: 2 })
  const desc = translate(`resources.${resource}.description`, { _: '' })

  return (
    <div>
      <span>{title}</span>
      {desc && (
        <div style={{ fontSize: '13px' }}>{desc}</div>
      )}
    </div>
  )
})
