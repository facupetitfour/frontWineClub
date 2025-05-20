import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

function CouponCard({ img, name, description, points }) {
  return (
    <>
    <Card sx={{ minWidth:'100%', maxWidth: '100%', borderRadius: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="200"
        image={img.url? img.url : img}
        alt={name}
        sx={{ objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
      />
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography variant="h6" component="div" noWrap>
            {name}
          </Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body1">{points}</Typography>
          </Box>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
    </>
  );
}

export default CouponCard;
