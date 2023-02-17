import { Divider } from 'antd'
import Paragraph from 'antd/es/typography/Paragraph'
import Title from 'antd/es/typography/Title'
import React from 'react'

import { UserForm } from '../userForm/UserForm'

export default function Home () {
  return (
    <>
      <Title>Home</Title>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam aliquet,
        purus vitae eleifend tristique, lorem magna volutpat orci, et vehicula
        erat erat nec elit. Aenean posuere nunc ac cursus facilisis. Aenean vel
        porta turpis, ut iaculis justo.
      </Paragraph>
      <Divider />
      <div>
        <UserForm />
      </div>
    </>
  )
}

