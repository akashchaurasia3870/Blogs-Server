import User from '../../users/models/userModal.js';
import CustomError from '../../../customErrors/CustomError.js'; // 
import Theme from '../models/themeModal.js';

const createTheme = async (user_id) => {
    try {

        // Check if user already exists
        let existingUser = await User.findOne({ user_id });
        if (existingUser) {
            const newTheme = new Theme({
                theme_user_id:user_id,
                theme: 'black',
                fontSize: '15px',
                fontColor: 'white',
                fontWeight: 'font-bold',
                fontStyle: 'font-italic',
                backgroundStyle: 'linear-gradient(to right, #ff7e5f, #feb47b)'
            });
    
            newTheme.save();
        }


        return { message: 'theme updated'};
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
};

const updateTheme = async (user_id , updatedValues) => {
    try {
        console.log(user_id ,updatedValues);
        
        // Find the theme by user_id and update the provided fields
        const updatedTheme = await Theme.findOneAndUpdate(
            { theme_user_id: user_id },
            { $set: updatedValues },
            { new: true, runValidators: true }
        );

        if (!updatedTheme) {
            throw new Error('Theme not found for the specified user.');
        }

        return updatedTheme;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
};

const getTheme = async (user_id ) => {
    try {
        // Find the theme by user_id and update the provided fields
        const theme = await Theme.findOne({ theme_user_id: user_id });


        if (!theme) {
            // throw new Error('Theme not found for the specified user.');
            await createTheme(user_id)
            theme = await getTheme(user_id)
        }

        return theme;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
};

const checkTheme = async (user_id ) => {
    try {
        // Find the theme by user_id and update the provided fields
        const theme = await Theme.findOne({ theme_user_id: user_id });


        if (!theme) {
            throw new Error('Theme not found for the specified user.');
            await createTheme(user_id)
            theme = await getTheme(user_id)
        }

        return theme;
    } catch (error) {
        throw new CustomError(error.message || 'Error signing up user', error.statusCode || 500);
    }
};



export {
    updateTheme,
    createTheme,
    getTheme,
};
