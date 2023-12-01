import React from 'react'

function SectionTitle({title, backgroundColor, boxShadow}) {
  const styles={
    backgroundColor:backgroundColor,
    boxShadow:boxShadow
  }
  return (
      <div className='launch-section-title' /*style={styles} */>
        {title}
    </div>
  )
}

export default SectionTitle