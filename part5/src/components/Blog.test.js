import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'testing is important',
    author: 'Jeff Bridges',
    url: 'www.coding.com',
    likes: 15,
    user: '12345'
  }

  let component

  const updateLikes = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlog={updateLikes} />
    )
  })

  test('at start only title and author are displayed', () => {
    const div = component.container.querySelector('.defaultBlog')
    expect(div).toHaveTextContent('testing is important')
    expect(div).toHaveTextContent('Jeff Bridges')
    expect(div).not.toHaveTextContent('www.coding.com')
    expect(div).not.toHaveTextContent(15)

    const div1 = component.container.querySelector('.fullBlog')
    expect(div1).toHaveStyle('display: none')
  })

  test('after clicking the button url and number of likes are shown', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.fullBlog')
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('www.coding.com')
    expect(div).toHaveTextContent(15)
  })

  test('if the like button is clicked twice, the event handler is called twice', () => {
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(updateLikes.mock.calls).toHaveLength(2)
  })
})