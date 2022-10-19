import { Card, List } from 'antd'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Post } from '../models/Post'

const HomePage = ({ data }: any) => {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    if (data) {
      const items: Post[] = []

      for (const i in data) {
        items.push(data[i])
      }

      setPosts(data)
    } else {
      console.log('data not found')
    }
  }, [data])

  return (
    <div className="container mt-5">
      <Card>
        <h1>How to Generate a Dynamic Sitemap with Next.js</h1>

        <List
          dataSource={posts}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={
                  <Link href={`/posts/${item.id}`}>
                    <a>{item.title}</a>
                  </Link>
                }
                description={item.id}
              />
            </List.Item>
          )}
        ></List>
      </Card>
    </div>
  )
}

export const getStaticProps = async () => {
  const dataURL = 'https://jsonplaceholder.typicode.com/posts'
  const res = await fetch(dataURL)

  const data = res.ok ? await res.json() : null

  return {
    props: {
      data,
    },
  }
}

export default HomePage
