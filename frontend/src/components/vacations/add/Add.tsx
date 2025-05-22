import { useForm } from 'react-hook-form'
import VacationDraft from '../../../models/vacation/VacationDraft'
import useService from '../../../hooks/useService'
import VacationsService from '../../../services/auth-aware/Vacations'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../redux/hooks'
import { ChangeEvent, useState } from 'react'
import { addVacation } from '../../../redux/vacationSlice'
import FormLoadingButton from '../../common/formButton/LoadingButton'
import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography
} from '@mui/material'

export default function Add(): JSX.Element {

    const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm<VacationDraft>()

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const [ previewImageSrc, setPreviewImageSrc ] = useState<string>('')

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const vacationsService = useService(VacationsService)

    const today = new Date().toISOString().split('T')[0];

    async function submit(draft: VacationDraft) {
        try {
            setIsSubmitting(true)

            if (draft.vacationImage) {
                draft.vacationImage = (draft.vacationImage as unknown as FileList)[0]
            }

            const newVacation = await vacationsService.addVacation(draft)
           
            dispatch(addVacation(newVacation))

            reset()
            setPreviewImageSrc('')
            
            navigate('/vacations')
        } catch (e) {
            console.error('Error creating vacation:', e)
            alert('Failed to create vacation.')
        } finally {
            setIsSubmitting(false)
        }
    }
    
    function previewImage(event: ChangeEvent<HTMLInputElement>){
        const file = event.currentTarget.files && event.currentTarget.files[0]
        if(file){
            const imageSource = URL.createObjectURL(file)
            setPreviewImageSrc(imageSource)
        }
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
            <Card sx={{ width: 400, p: 2 }}>
                <CardContent>
                    <Typography variant="h5" textAlign="center" gutterBottom>
                        Add Vacation
                    </Typography>
                    <form onSubmit={handleSubmit(submit)}>
                        <TextField
                            fullWidth
                            label="Destination"
                            {...register('destination', { required: 'Destination is required' })}
                            error={!!errors.destination}
                            helperText={errors.destination?.message}
                            margin="normal"
                        />

                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            {...register('description', { required: 'Description is required' })}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            margin="normal"
                        />

                        <TextField
                            fullWidth
                            type="date"
                            label="Start Date"
                            {...register('vacationStart', {
                                required: 'Start date is required',
                                validate: value => value >= today || 'Cannot select dates in the past'
                            })}
                            error={!!errors.vacationStart}
                            helperText={errors.vacationStart?.message}
                            InputLabelProps={{ shrink: true }}
                            margin="normal"
                        />

                        <TextField
                            fullWidth
                            type="date"
                            label="End Date"
                            {...register('vacationEnd', {
                                required: 'End date is required',
                                validate: value => {
                                    const vacationStart = new Date(getValues().vacationStart)
                                    const vacationEnd = new Date(value)
                                    return vacationEnd >= vacationStart || 'End date cannot be before start date'
                                }
                            })}
                            error={!!errors.vacationEnd}
                            helperText={errors.vacationEnd?.message}
                            InputLabelProps={{ shrink: true }}
                            margin="normal"
                        />

                        <TextField
                            fullWidth
                            type="number"
                            label="Price"
                            {...register('price', {
                                required: 'Price is required',
                                min: { value: 0, message: 'Price must be positive' },
                                max: { value: 10000, message: 'Price cannot exceed 10,000' }
                            })}
                            error={!!errors.price}
                            helperText={errors.price?.message}
                            margin="normal"
                        />

                        <Box mt={2}>
                            <input
                                type="file"
                                accept="image/png, image/jpeg, image/jpg, image/webp"
                                {...register('vacationImage', {
                                    required: 'Vacation image is required'
                                })}
                                onChange={previewImage}
                                style={{ marginTop: 10 }}
                            />
                            {errors.vacationImage && (
                                <Typography color="error" variant="body2">
                                    {errors.vacationImage.message}
                                </Typography>
                            )}
                        </Box>

                        {previewImageSrc && (
                            <Box mt={2} display="flex" justifyContent="center">
                                <img src={previewImageSrc} alt="Preview" style={{ maxWidth: '100%', maxHeight: 250, borderRadius: 4 }} />
                            </Box>
                        )}

                        <Box display="flex" justifyContent="space-between" mt={3}>
                            <FormLoadingButton isSubmitting={isSubmitting} buttonText="Add Vacation" loadingText="Adding Vacation..." />
                            <Button variant="outlined" color="secondary" onClick={() => navigate('/vacations')}>
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    )
}
