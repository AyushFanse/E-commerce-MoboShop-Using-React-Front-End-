import axios from 'axios';

//-------------------------------* WEBSITE TITLE *-------------------------------//

export const TabTitle = ((newTitel) => {
    return (document.title = newTitel)
})

//-------------------------------* SAVE AND REMOVE SAVE POST FUNCTIONS *-------------------------------//

export const SaveProduct = (async (productId, Id, Url) => {
    await axios.put(`${Url}/users/saveproduct/${Id}`,
        {
            savedProduct: productId
        })
})

export const DeleteSavedProduct = (async (productId, Id, Url) => {
    await axios.put(`${Url}/users/deletesavedproduct/${Id}`,
        {
            savedProduct: productId
        })
})
