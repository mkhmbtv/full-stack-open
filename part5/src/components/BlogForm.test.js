import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const author = component.container.querySelector('#author')
  const title = component.container.querySelector('#title')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing is important' }
  })

  fireEvent.change(author, {
    target: { value: 'Jeff Bridges' }
  })

  fireEvent.change(url, {
    target: { value: 'www.coding.com' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing is important')
  expect(createBlog.mock.calls[0][0].author).toBe('Jeff Bridges')
  expect(createBlog.mock.calls[0][0].url).toBe('www.coding.com')
})