import React from 'react';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import './Output.css';

const Output = ({ shortUrl, removeResult }) => {
	return (
		<div className="output-div">
			<a id="shortUrl" target="_blank" rel="noreferrer" href={shortUrl}>
				{shortUrl}
			</a>
			<button>
				<FileCopyIcon
					className="btn"
					data-clipboard-target="#shortUrl"
					onClick={removeResult}
				/>
			</button>
		</div>
	);
};

export default Output;
