const fs = require('fs');
const axios = require('axios');
const sharp = require('sharp');
const PDFDocument = require('pdfkit');

// Extracted destinations from your PRD data
const destinations = [
    "Rishikesh", "Manali", "Shimla", "Dharamshala", "Amritsar", "Srinagar", 
    "Udaipur", "Jaisalmer", "Khajuraho", "Pachmarhi", "Mumbai", "Pune", 
    "Mahabaleshwar", "Ahmedabad", "Rann of Kutch", "Ooty", "Coorg", "Hampi", 
    "Mysore", "Wayanad", "Pondicherry", "Kodaikanal", "Hyderabad", "Kolkata", 
    "Darjeeling", "Bhubaneswar", "Puri", "Gangtok", "Shillong", 
    "Kaziranga National Park", "Tawang", "Cherrapunji", "Delhi", "Kanyakumari", "Alleppey"
];

const UNSPLASH_ACCESS_KEY = 'IRbqwjMY_YAQ4wvY4knaFnjSBuekHMxZthYbYgm-fhQ';

async function fetchDestinationImage(destination) {
    try {
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
                query: destination,
                per_page: 1,
                orientation: 'landscape'
            },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`
            }
        });

        if (response.data.results.length > 0) {
            // Unsplash allows formatting via URL parameters. We request 'avif' here.
            let imageUrl = response.data.results[0].urls.raw;
            imageUrl += '&w=800&fit=crop&fm=avif';
            return imageUrl;
        }
        return null;
    } catch (error) {
        console.error(`Error fetching image for ${destination}:`, error.message);
        return null;
    }
}

async function downloadAndConvertImage(url) {
    try {
        const response = await axios({
            url,
            responseType: 'arraybuffer'
        });
        
        // PDFKit does not support AVIF natively. 
        // We use Sharp to convert the fetched AVIF buffer to JPEG for the PDF.
        const jpegBuffer = await sharp(response.data)
            .jpeg()
            .toBuffer();
            
        return jpegBuffer;
    } catch (error) {
        console.error('Error downloading/converting image:', error.message);
        return null;
    }
}

async function generatePDF() {
    const doc = new PDFDocument({ margin: 50 });
    const writeStream = fs.createWriteStream('Destinations.pdf');
    doc.pipe(writeStream);

    doc.fontSize(24).text('Indian Destinations', { align: 'center' });
    doc.moveDown(2);

    for (let i = 0; i < destinations.length; i++) {
        const dest = destinations[i];
        console.log(`Processing ${i + 1}/${destinations.length}: ${dest}...`);
        
        const imageUrl = await fetchDestinationImage(dest);
        
        if (imageUrl) {
            const imageBuffer = await downloadAndConvertImage(imageUrl);
            
            if (imageBuffer) {
                // Add a new page for every image after the first one
                if (i > 0) doc.addPage();
                
                doc.fontSize(18).text(dest, { align: 'center' });
                doc.moveDown();
                
                // Embed the image in the PDF
                doc.image(imageBuffer, {
                    fit: [500, 400],
                    align: 'center',
                    valign: 'center'
                });
            }
        } else {
            console.log(`No image found for ${dest}`);
        }
        
        // Respect Unsplash API rate limits (50 requests per hour for demo apps)
        // Adding a short delay to prevent hitting limits too quickly
        await new Promise(resolve => setTimeout(resolve, 1000));
    }

    doc.end();
    
    writeStream.on('finish', () => {
        console.log('✅ PDF generated successfully as Destinations.pdf');
    });
}

generatePDF();