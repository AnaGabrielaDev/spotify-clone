import {useState, useEffect} from 'react'

import styles from './Message.module.css'

function Message({type, text}: {type: string, text: string}) {

  const [visible, setVisible] = useState(false)
  useEffect(() => {

    if (!text) {
      setVisible(false)
      return
    }

    setVisible(true)

    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => clearTimeout(timer)
        
  }, [text])

  return ( 
    <>
      {visible && (
        <div className={`${styles.message} ${styles[type]}`}>
          <p>{text}</p> 
        </div>
      )}
    </>
  );
}

export default Message;