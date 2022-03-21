import React, { useState } from 'react';
import ClipboardJS from 'clipboard';
import Output from './Output';

import './App.css';

// require('dotenv').config();

const App = () => {
	new ClipboardJS('.btn');

	const [userInput, setUserInput] = useState('');
	const [shortUrl, setShortUrl] = useState('');

	const API_KEY = process.env.REACT_APP_API_KEY;

	if (!userInput.includes('https://')) {
		setUserInput(`https://${userInput}`);
	}

	const shortenUrl = async () => {
		const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ long_url: userInput, domain: 'bit.ly' }),
		});

		const data = await response.json();
		setShortUrl(data.link);
		setUserInput('');
	};

	const removeResult = () => {
		setTimeout(() => {
			setShortUrl('');
		}, 100);

		alert('Copied!');
	};

	return (
		<div className="app">
			<h1 className="title">ShortUrl</h1>
			<div>
				<input
					value={userInput}
					onChange={(e) => setUserInput(e.target.value)}
					type="url"
					placeholder="Enter URL here..."
					className="inputForm"
				/>
				<button className="button" onClick={shortenUrl}>
					Shorten it!
				</button>

				{shortUrl !== '' ? (
					<Output shortUrl={shortUrl} removeResult={removeResult} />
				) : null}
			</div>
		</div>
	);
};

export default App;
