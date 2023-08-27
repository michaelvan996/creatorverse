import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../client.js'
import { useNavigate } from 'react-router-dom'

import Nav from '../components/Nav'

import '@picocss/pico/css/pico.min.css'

const EditCreator = (props) => {
  const [description, setDescription] = useState('')
	const [creatorTitle, setCreatorTitle] = useState('')
  const [mediaLink, setMediaLink] = useState('')
	const [imgLink, setImgLink] = useState('')

  const id = useParams()
	let navigate = useNavigate();

  useEffect(() => {
    const fetchCreatorData = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select('*')
        .eq('id', id.id)
        .single();
      if (error) {
        console.log('Error fetching creator data:', error);
      } else {
          setCreatorTitle(data.name);
          setImgLink(data.imageURL);
          setDescription(data.description);
          setMediaLink(data.url);
      }
    }
    fetchCreatorData();
  }, [])

  const handleSubmit = async (e) => {
		e.preventDefault();

		const { data, error } = await supabase
      .from('creators')
      .update({
          name: creatorTitle,
          url: mediaLink,
          description: description,
          imageURL: imgLink
      })
      .eq('id', id.id);

		if (error) {
			console.log("Error from editing creator:", error);
		} else {
			console.log("Inserted creator successfully:", data);
            setCreatorTitle('');
            setImgLink('');
            setDescription('');
            setMediaLink('');
      let path = `/`;
      navigate(path)
		}
	}

  return (
    <div>
      <Nav />
			<form onSubmit={ handleSubmit }>
				<fieldset>
					<label>
						Creator Name:
						<input
							name="creator_name"
							placeholder="Input Creator Name"
                            value={creatorTitle}
                            onChange={(e) => setCreatorTitle(e.target.value)}
						/>
					</label>
					<label>
						Image URL:
						<input
							name="img_url"
							placeholder="Input image link for creator"
                            value={imgLink}
                            onChange={(e) => setImgLink(e.target.value)}
						/>
					</label>
					<label>
						Description:
						<textarea
							name="description"
							placeholder="Input description for creator"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
						>
						</textarea>
					</label>
					<label>
						Social Media Link:
						<input
							name="media_link"
							placeholder="Input link for creator"
                            value={mediaLink}
                            onChange={(e) => setMediaLink(e.target.value)}
						/>
					</label>
				</fieldset>
				<input type="submit" value="Submit" />
			</form>
    </div>
  )
}

export default EditCreator
