import React, { useState } from 'react'
import { supabase } from '../client.js'
import { useNavigate } from 'react-router-dom'

import Nav from '../components/Nav.jsx'

import '@picocss/pico/css/pico.min.css'

const CreateCreator = () => {
	const [creatorTitle, setCreatorTitle] = useState('')
	const [imgLink, setImgLink] = useState('')
	const [description, setDescription] = useState('')
	const [mediaLink, setMediaLink] = useState('')

	let navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const { data, error } = await supabase
			.from('creators')
			.insert([{ name: creatorTitle, url: mediaLink, description: description, imageURL: imgLink }]);

		if (error) {
			console.log("Error inserting creator:", error);
		} else {
			console.log("Successfully inserted creator:", data);
            setDescription('');
			setImgLink('');
            setMediaLink('');
			setCreatorTitle('');
			let path = `/`;
			navigate(path);
		}
	}

	return (
		<div>
			<Nav />
			<h2>Create a New Creator!</h2>
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
							placeholder="Input creator image link"
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
						Social Media (Youtube) Link:
						<input
							name="media_link"
							placeholder="Input link for creator"
                            value={mediaLink}
                            onChange={(e) => setMediaLink(e.target.value)}
						/>
					</label>
				</fieldset>
				<input type="submit" value="Submit"/>
			</form>
		</div>
	)
}

export default CreateCreator
