import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsPdfClicked } from "../../redux/store";
import jsPDF from "jspdf";
import porscheImg from "../../assets/porsche-logo-png.png";
import pdfImg from "../../assets/pdf-icon.svg";

export default function PdfButton() {
    // Get the dispatch function from the Redux store
    const dispatch = useDispatch();

    // selector for pdf information
    const {
        pdfPhotos,
        exteriorColor,
        seatColor,
        interiorColor,
        rimColor,
        discBrakeColor,
    } = useSelector((state) => state.selections);

    useEffect(() => {
        if (pdfPhotos.length === 2) {
            const pdf = new jsPDF();

            const maxWidth = 180; // Adjusted maximum image width
            const maxHeight = 100; // Adjusted maximum image height to accommodate two images and text
            let lastImageBottom = 10; // Start Y-coordinate for the first image
            const pageWidth = pdf.internal.pageSize.getWidth(); // Get the page width for centering images

            pdfPhotos.forEach((photo, index) => {
                if (
                    !photo.startsWith("data:image/jpeg;base64,") &&
                    !photo.startsWith("data:image/png;base64,")
                ) {
                    photo = `data:image/jpeg;base64,${photo}`;
                }

                const originalWidth = 1000; // Assume fixed original dimensions for simplicity
                const originalHeight = 690;
                const aspectRatio = originalWidth / originalHeight;

                let newWidth, newHeight;

                // Determine whether to scale based on width or height by comparing aspect ratios
                if (aspectRatio > maxWidth / maxHeight) {
                    // Image is "wider"
                    newWidth = maxWidth;
                    newHeight = maxWidth / aspectRatio;
                } else {
                    // Image is "taller"
                    newWidth = maxHeight * aspectRatio;
                    newHeight = maxHeight;
                }

                // Ensure dimensions do not exceed maximum constraints
                newWidth = Math.min(newWidth, maxWidth);
                newHeight = Math.min(newHeight, maxHeight);

                // Adjust startY based on previous image's bottom plus a margin
                const startY =
                    index === 0 ? lastImageBottom : lastImageBottom + 10;

                // Calculate startX to center the image
                const startX = (pageWidth - newWidth) / 2;

                pdf.addImage(
                    photo,
                    "JPEG",
                    startX,
                    startY,
                    newWidth,
                    newHeight
                );

                // Update lastImageBottom for the next image or text placement
                lastImageBottom = startY + newHeight;
            });

            // Your existing code for adding photos...
            const startX = 15; // X-coordinate for starting text
            const endX = pageWidth - 15; // X-coordinate for ending text, assuming 15 units margin on the right as well
            const textStartY = lastImageBottom + 10; // Starting Y-coordinate for text, adjust the margin as needed

            const categories = [
                { description: "Exterior Color", name: exteriorColor.name },
                { description: "Seat Color", name: seatColor.name },
                { description: "Interior Color", name: interiorColor.name },
                { description: "Rim Color", name: rimColor.name },
                { description: "Disc Brake Color", name: discBrakeColor.name },
            ];

            let currentY = textStartY;
            categories.forEach((item, index) => {
                // Calculate right-aligned X-coordinate for the value
                const valueTextWidth =
                    (pdf.getStringUnitWidth(item.name) *
                        pdf.internal.getFontSize()) /
                    pdf.internal.scaleFactor;
                const valueX = endX - valueTextWidth; // Right align the value
                // Add a top line for the start of the box
                // Draw the description on the left
                pdf.text(`${item.description}:`, startX, currentY);

                // Draw the name on the right
                pdf.text(item.name, valueX, currentY);

                // Move to the next line
                currentY += 6;
            });

            // Assuming the dimensions of the logo have been defined or calculated earlier
            const logoWidth = 20; // Adjust based on the actual width of your logo
            const logoHeight = 20; // Adjust based on the actual height of your logo
            const pageHeight = pdf.internal.pageSize.getHeight();

            // Calculate the right corner position for the logo
            const logoX = pageWidth - logoWidth - 10; // 10 units from the right edge
            const logoY = pageHeight - logoHeight - 10; // 10 units from the bottom

            // Assuming porscheImg is your base64-encoded PNG logo
            pdf.addImage(
                porscheImg,
                "PNG",
                logoX,
                logoY,
                logoWidth,
                logoHeight
            );

            pdf.save("configuration.pdf");
        }
    }, [pdfPhotos]);

    const triggerPdf = () => {
        // Dispatch the setIsPdfClicked action to trigger the PDF generation process
        dispatch(setIsPdfClicked());
    };

    return <img src={pdfImg} className="pdf-button" onClick={triggerPdf} />;
}
