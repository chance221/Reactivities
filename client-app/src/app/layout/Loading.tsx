import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'


export const Loading: React.FC<{content?: string}> = ({
  content
}) => {
  return (
    <div>
      <Dimmer active inverted>
        <Loader size='huge' content={content}/>
      </Dimmer>
    </div>
  )
}
