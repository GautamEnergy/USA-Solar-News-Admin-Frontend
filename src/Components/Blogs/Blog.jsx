
import React from 'react';

const Blog = () => {
    return (
        <div className='BlogPage' style={{ width: '70%', float: 'left' }}>

{/* ********************************** StartBlog ************************************************************* */}
            <div className='startBlog' style={{ marginBottom: '20px' }}>
                <p>Paragraph Text</p>
                <img src="image.jpg" alt="Image" style={{ width: '60%' }} />
                <p>Slogan Text</p>
            </div>

            <div className='smallPage' style={{ marginBottom: '20px' }}>
                <h2>Heading</h2>
                <p>Description</p>
                <ul>
                    <li>Subheading 1</li>
                    <li>Subheading 2</li>
                    <li>Subheading 3</li>
                    <li>Subheading 4</li>
                </ul>
            </div>

{/* ********************************** randomParagraph ************************************************************* */}

            <div className='randomParagraph' style={{ marginBottom: '20px' }}>
                <h1>Heading2</h1>
            </div>



{/* ********************************** urltext ************************************************************* */}

            <div className='urltext' style={{ marginBottom: '20px' }}>
                <a href="#">URL Link</a>
            </div>


{/* ********************************** Tags ************************************************************* */}
            <div className='Tags' style={{ marginBottom: '20px' }}>
                <h1>Tags</h1>
                <div style={{ marginBottom: '10px' }}>
                    <button>Button 1</button>
                    <button>Button 2</button>
                    <button>Button 3</button>
                    <button>Button 4</button>
                    <button>Button 5</button>
                </div>
                <div>
                    <button>Button 6</button>
                    <button>Button 7</button>
                    <button>Button 8</button>
                    <button>Button 9</button>
                    <button>Button 10</button>
                </div>
            </div>



{/* ********************************** Comment-Box ************************************************************* */}
            <div className='Comment-Box'>
                <div>
                    <img src="user-icon.jpg" alt="User Icon" style={{ marginRight: '10px' }} />
                <span style={{marginLeft:"23px"}}> User Name </span> <span style={{marginLeft:"253px"}}> Date</span>
                    
                </div>
                <div>
                    <p>Some Comment Text</p>
                </div>
            </div>

        </div>
    );
}

export default Blog;
