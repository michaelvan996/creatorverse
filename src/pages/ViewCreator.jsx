import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { supabase } from '../client.js'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import youtubeLogo from '../assets/YouTube.png'

import '../App.css'
import '@picocss/pico/css/pico.min.css'

const ViewCreator = (props) => {
  const [creatorData, setCreatorData] = useState(null);

  const creatorId = useParams()

  useEffect(() => {
    const fetchCreatorData = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', creatorId.id)
        .single();
      if (error) {
        console.log('Error from fetching creator data:', error);
      } else {
        setCreatorData(data);
      }
    }
    fetchCreatorData();
  }, [])

  let navigate = useNavigate();
  const deleteCreator = async () => {
    console.log("Creator deleted")

    const { data, error } = await supabase
      .from('creators')
      .delete()
      .eq('id', creatorId.id);

    if (error) {
      console.log("Error from deleting creator:", error);
    } else {
      console.log("Successfully deleted creator:", data);
      let path = `/`;
      navigate(path)
    }
  }

  return (
    <div>
      <Nav />
      <div class="container">
        {creatorData && (
          <div >
            <div class="card-body">
              <img className="viewImage" src={creatorData.imageURL} />
            </div>
            <div class="card-body">
              <h3 class="card-title">{creatorData.name} </h3>
              <div className="flex-center">
                <div>
                  <img className="yt-icon" src={youtubeLogo} />
                  <a href={creatorData.url}>{creatorData.url}</a>
                </div>
              </div>
              <p class="card-text">{creatorData.description}</p>
              <div class="grid">
                <a href={`/edit/${creatorId.id}`} role="button" class="secondary">Edit</a>
                <a href="#" role="button" className="delete-button" onClick={() => deleteCreator()}>Delete</a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewCreator
