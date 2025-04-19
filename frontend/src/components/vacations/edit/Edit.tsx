import { useForm } from 'react-hook-form';
import { useEffect, useState, ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { editVacation } from '../../../redux/vacationSlice';
import VacationDraft from '../../../models/vacation/VacationDraft';
import useService from '../../../hooks/useService';
import VacationsService from '../../../services/auth-aware/Vacations';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';
import FormLoadingButton from '../../common/formButton/LoadingButton';

export default function Edit() {
    const { register, handleSubmit, reset, formState: { errors }, getValues } = useForm<VacationDraft>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [previewImageSrc, setPreviewImageSrc] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { id } = useParams<'id'>();
    const vacationsService = useService(VacationsService);
    const vacation = useAppSelector(state => state.vacations.vacations.find(v => v.id === id));

    useEffect(() => {
        if (vacation) {
            const { destination, description, price, imageUrl } = vacation;
            reset({
                destination,
                description,
                vacationStart: new Date(vacation.vacationStart).toISOString().split('T')[0],
                vacationEnd: new Date(vacation.vacationEnd).toISOString().split('T')[0],
                price,
            });
            if (imageUrl) setPreviewImageSrc(imageUrl);
        } else {
            alert('Vacation not found');
            navigate('/vacations');
        }
    }, [vacation, reset, navigate]);

    async function submit(draft: VacationDraft) {
        try {
            if (id) {
                setIsSubmitting(true);
                if (draft.vacationImage && typeof draft.vacationImage !== 'string') {
                    draft.vacationImage = (draft.vacationImage as unknown as FileList)[0];
                }
                const editedVacation = await vacationsService.editVacation(id, draft);
                dispatch(editVacation(editedVacation));
                navigate('/vacations');
            }
        } catch (e) {
            console.error('Error editing vacation:', e);
            alert('Failed to edit vacation.');
        } finally {
            setIsSubmitting(false);
        }
    }

    function previewImage(event: ChangeEvent<HTMLInputElement>) {
        const file = event.currentTarget.files && event.currentTarget.files[0];
        if (file) {
            setPreviewImageSrc(URL.createObjectURL(file));
        }
    }

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f5f5">
            <Card sx={{ width: 400, p: 2 }}>
                <CardContent>
                    <Typography variant="h5" textAlign="center" gutterBottom>
                        Edit Vacation
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
                            {...register('vacationStart', { required: 'Start date is required' })} 
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
                                validate: value => new Date(value) >= new Date(getValues().vacationStart) || 'End date cannot be before start date'
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

                        <input 
                            type="file" 
                            accept='image/png, image/jpeg, image/jpg, image/webp' 
                            {...register('vacationImage')} 
                            onChange={previewImage} 
                            style={{ marginTop: 10 }}
                        />

                        {previewImageSrc && (
                            <Box mt={2} display="flex" justifyContent="center">
                                <img src={previewImageSrc} alt="Preview" style={{ maxWidth: '100%', maxHeight: 250, borderRadius: 4 }} />
                            </Box>
                        )}

                        <Box display="flex" justifyContent="space-between" mt={3}>
                            <FormLoadingButton isSubmitting={isSubmitting} buttonText='Edit Vacation' loadingText='Editing Vacation...' />
                            <Button variant="outlined" color="secondary" onClick={() => navigate('/vacations')}>
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}
