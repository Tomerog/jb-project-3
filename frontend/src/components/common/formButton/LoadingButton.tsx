import './LoadingButton.css'
import loadingImageSource from '../../../assets/images/loading.webp'
import { Button } from '@mui/material'

interface LoadingButtonProps {
    isSubmitting: boolean,
    buttonText: string,
    loadingText: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>

}
export default function FormLoadingButton(props: LoadingButtonProps): JSX.Element {

    const {
        isSubmitting,
        buttonText,
        loadingText,
        onClick,
    } = props

    return (
        <div className='LoadingButton'>
            {!isSubmitting && <Button type='submit' variant="outlined" color="secondary" onClick={onClick}>{buttonText}</Button>}
            {isSubmitting && <p>{loadingText}... <i><img src={loadingImageSource}/></i></p>}
        </div>
    )
}