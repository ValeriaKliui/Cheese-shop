import React from 'react'

const Favourite = ({ liked, addToFavourite }) => {
    return (
        <div className={liked ? ['favourite__icon', 'liked'].join(' ') : ['favourite__icon']} onClick={()=>{addToFavourite()}}>
            <svg height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 620.701 620.701" >                
                <path d="M562.413,284.393c-9.68,41.044-32.121,78.438-64.831,108.07L329.588,542.345l-165.11-149.843 c-32.771-29.691-55.201-67.076-64.892-108.12c-6.965-29.484-4.103-46.14-4.092-46.249l0.147-0.994 c6.395-72.004,56.382-124.273,118.873-124.273c46.111,0,86.703,28.333,105.965,73.933l9.061,21.477l9.061-21.477 c18.958-44.901,61.694-73.922,108.896-73.922c62.481,0,112.478,52.27,119,125.208C566.517,238.242,569.379,254.908,562.413,284.393z" />
            </svg>
        </div>
    )
}

export default Favourite