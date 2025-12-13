using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace Nafeza.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MediaController : ControllerBase
    {
        // Helper method to get all news articles with full content
        private object[] GetAllNewsArticles()
        {
            return new[]
            {
                new
                {
                    id = 1,
                    title = "A Discussion Session Sponsored by the Agricultural Export Council to discuss the Advance Cargo Information (ACI) system",
                    description = "The Agricultural Export Council organized a discussion session to explore the implementation and benefits of the Advance Cargo Information (ACI) system for agricultural exports, focusing on streamlining trade procedures and enhancing export efficiency.",
                    content = @"<p>As part of its ongoing support for the industrial and business community, the Agricultural Export Council organized a comprehensive discussion session to explore the Advance Cargo Information (ACI) system and its impact on agricultural exports in Egypt.</p>
<p>The session, which took place in Cairo, brought together key stakeholders from the agricultural export sector, including exporters, freight forwarders, and representatives from Nafeza, the National Single Window for Foreign Trade.</p>
<p>During the session, participants discussed the various benefits of the ACI system, including:</p>
<ul>
<li>Streamlined customs clearance procedures</li>
<li>Reduced processing times for agricultural exports</li>
<li>Enhanced transparency in trade documentation</li>
<li>Improved coordination between exporters and customs authorities</li>
</ul>
<p>The Agricultural Export Council emphasized the importance of adopting digital solutions to enhance Egypt's competitiveness in international markets. The ACI system represents a significant step forward in modernizing trade procedures and facilitating smoother export operations.</p>
<p>Participants expressed their commitment to working closely with Nafeza to ensure successful implementation of the system across all agricultural export channels. The session concluded with a Q&A segment where attendees had the opportunity to address specific concerns and receive guidance on system registration and usage.</p>",
                    publishedDate = "2025-10-22",
                    category = "News",
                    imageUrl = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
                    author = "Nafeza Editorial Team",
                    tags = new[] { "ACI System", "Agricultural Exports", "Trade Facilitation" }
                },
                new
                {
                    id = 2,
                    title = "Logistics Working Group Roundtable: Automotive Supply Chain in Egypt: Addressing Key Challenges",
                    description = "The German-Arab Chamber of Industry and Commerce, in cooperation with Nafeza, organized a roundtable discussion focusing on the automotive supply chain in Egypt and addressing key challenges facing the industry.",
                    content = @"<p>The German-Arab Chamber of Industry and Commerce, in cooperation with Nafeza, successfully organized a Logistics Working Group Roundtable on March 5, 2025, focusing on the automotive supply chain in Egypt.</p>
<p>The event brought together industry leaders, logistics experts, and government representatives to discuss critical challenges and opportunities in Egypt's automotive supply chain sector.</p>
<p>Key topics discussed during the roundtable included:</p>
<ul>
<li>Current state of the automotive supply chain in Egypt</li>
<li>Challenges in logistics and customs procedures</li>
<li>Integration of ACI system with automotive supply chains</li>
<li>Best practices for streamlining automotive imports and exports</li>
<li>Future opportunities for growth and development</li>
</ul>
<p>Representatives from Nafeza presented the latest developments in the Advance Cargo Information system and how it can benefit automotive industry stakeholders. The discussion highlighted the importance of digital transformation in improving supply chain efficiency and reducing operational costs.</p>
<p>Participants engaged in productive dialogue about potential solutions to existing challenges and explored collaborative opportunities to enhance the automotive supply chain ecosystem in Egypt. The roundtable concluded with a commitment to continued cooperation between the German-Arab Chamber, Nafeza, and industry stakeholders.</p>",
                    publishedDate = "2025-03-05",
                    category = "News",
                    imageUrl = "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800",
                    author = "Nafeza Communications",
                    tags = new[] { "Automotive", "Supply Chain", "Logistics", "Roundtable" }
                },
                new
                {
                    id = 3,
                    title = "Advance Cargo Information (ACI) system for Air Shipments Workshop",
                    description = "Nafeza conducted a comprehensive workshop focusing on the ACI system specifically for air shipments, covering registration procedures, documentation requirements, and operational guidelines for airlines and freight forwarders.",
                    content = @"<p>Nafeza successfully conducted a specialized workshop on the Advance Cargo Information (ACI) system for air shipments, providing detailed guidance to airlines, freight forwarders, and cargo handlers.</p>
<p>The workshop, held at Cairo International Airport, covered essential aspects of the ACI system implementation for air cargo operations, including:</p>
<ul>
<li>Registration procedures for airlines and freight forwarders</li>
<li>Documentation requirements for air shipments</li>
<li>Timeline and deadlines for ACI submission</li>
<li>System navigation and user interface training</li>
<li>Troubleshooting common issues and challenges</li>
</ul>
<p>Industry participants gained valuable insights into how the ACI system streamlines air cargo operations, reduces processing times, and enhances security measures. The workshop included hands-on training sessions where attendees practiced using the Nafeza platform for submitting advance cargo information.</p>
<p>Representatives from major airlines and freight forwarding companies attended the event, demonstrating strong industry interest in adopting digital solutions for air cargo management. The workshop received positive feedback from participants, who appreciated the practical approach and comprehensive coverage of the topic.</p>",
                    publishedDate = "2025-09-28",
                    category = "News",
                    imageUrl = "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800",
                    author = "Nafeza Training Department",
                    tags = new[] { "ACI System", "Air Shipments", "Workshop", "Training" }
                },
                new
                {
                    id = 4,
                    title = "NAFEZA Platform Achieves 2 Million+ Trade Declarations Processed",
                    description = "The National Single Window for Foreign Trade has successfully processed over 2 million trade declarations, marking a significant milestone in Egypt's digital transformation journey and demonstrating the platform's efficiency and reliability.",
                    content = @"<p>The Nafeza platform has reached a historic milestone, successfully processing over 2 million trade declarations since its launch. This achievement represents a significant step forward in Egypt's digital transformation journey and demonstrates the platform's growing adoption and effectiveness.</p>
<p>The milestone reflects the trust and confidence that businesses and traders have placed in the Nafeza system. The platform has revolutionized trade procedures in Egypt by:</p>
<ul>
<li>Reducing processing times by up to 70%</li>
<li>Eliminating the need for physical document submission</li>
<li>Providing real-time tracking and status updates</li>
<li>Enhancing transparency and reducing opportunities for errors</li>
</ul>
<p>Since its implementation, Nafeza has continuously evolved to meet the changing needs of the trade community. The platform now serves over 50,000 registered businesses and traders, processing thousands of declarations daily across all major ports and border crossings in Egypt.</p>
<p>This achievement would not have been possible without the collaboration and support of all stakeholders, including customs authorities, port operators, freight forwarders, and the business community. Nafeza remains committed to further improving its services and expanding its capabilities to better serve Egypt's foreign trade sector.</p>",
                    publishedDate = "2025-09-15",
                    category = "News",
                    imageUrl = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
                    author = "Nafeza Management",
                    tags = new[] { "Milestone", "Achievement", "Digital Transformation", "Trade Declarations" }
                },
                new
                {
                    id = 5,
                    title = "New Features Added to Nafeza Platform: Enhanced Tariff Search and Real-time Tracking",
                    description = "Nafeza has introduced new features including an enhanced tariff search functionality and real-time tracking capabilities, providing users with improved tools to manage their trade operations more effectively.",
                    content = @"<p>Nafeza is pleased to announce the launch of several new features designed to enhance user experience and improve operational efficiency for traders and businesses.</p>
<p>The latest platform update includes:</p>
<h3>Enhanced Tariff Search</h3>
<p>The new tariff search functionality provides users with more comprehensive and accurate results when searching for HS codes, customs duties, and taxes. The enhanced search includes:</p>
<ul>
<li>Improved search algorithms for faster and more accurate results</li>
<li>Advanced filtering options by chapter, heading, and subheading</li>
<li>Detailed tariff information with historical data</li>
<li>Export functionality for search results</li>
</ul>
<h3>Real-time Tracking</h3>
<p>Users can now track their declarations and applications in real-time with enhanced visibility into the status of their submissions. The new tracking features include:</p>
<ul>
<li>Real-time status updates</li>
<li>Detailed progress tracking through each stage</li>
<li>Automated notifications for status changes</li>
<li>Historical timeline of all actions and updates</li>
</ul>
<p>These improvements are part of Nafeza's ongoing commitment to providing the best possible user experience and supporting Egypt's trade community with cutting-edge digital solutions.</p>",
                    publishedDate = "2025-09-01",
                    category = "News",
                    imageUrl = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
                    author = "Nafeza Development Team",
                    tags = new[] { "Platform Update", "New Features", "Tariff Search", "Tracking" }
                },
                new
                {
                    id = 6,
                    title = "Partnership Agreement Signed Between Nafeza and Major Shipping Lines",
                    description = "Nafeza has signed strategic partnership agreements with leading international shipping lines to integrate their systems with the ACI platform, facilitating smoother cargo information exchange and reducing processing times.",
                    content = @"<p>Nafeza has entered into strategic partnership agreements with several major international shipping lines, marking a significant step forward in streamlining cargo information exchange and improving trade facilitation.</p>
<p>These partnerships will enable direct system integration between shipping lines and the Nafeza platform, resulting in:</p>
<ul>
<li>Automated cargo information transfer</li>
<li>Reduced manual data entry and errors</li>
<li>Faster processing times</li>
<li>Enhanced data accuracy and consistency</li>
</ul>
<p>The agreements represent a collaborative effort to modernize Egypt's trade infrastructure and align with international best practices. Shipping lines will be able to seamlessly submit advance cargo information directly through their existing systems, eliminating the need for duplicate data entry.</p>
<p>This integration will benefit all stakeholders in the trade ecosystem, from shipping lines and freight forwarders to importers and customs authorities. The partnerships demonstrate Nafeza's commitment to building a comprehensive digital trade ecosystem that serves all participants in the supply chain.</p>",
                    publishedDate = "2025-08-20",
                    category = "News",
                    imageUrl = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800",
                    author = "Nafeza Business Development",
                    tags = new[] { "Partnership", "Shipping Lines", "Integration", "Collaboration" }
                },
                new
                {
                    id = 7,
                    title = "Training Program Launched for Customs Brokers on ACI System",
                    description = "A comprehensive training program has been launched to educate customs brokers on the Advance Cargo Information system, ensuring smooth adoption and compliance with new trade facilitation requirements.",
                    content = @"<p>Nafeza has launched a comprehensive training program specifically designed for customs brokers to ensure they are fully equipped to work with the Advance Cargo Information (ACI) system.</p>
<p>The training program covers essential topics including:</p>
<ul>
<li>Overview of the ACI system and its benefits</li>
<li>Registration and account setup procedures</li>
<li>Step-by-step guide to submitting advance cargo information</li>
<li>Documentation requirements and best practices</li>
<li>Common issues and troubleshooting</li>
<li>Compliance requirements and deadlines</li>
</ul>
<p>The program is being delivered through a combination of online modules and in-person workshops, ensuring that customs brokers across Egypt have access to the training they need. Participants receive certificates upon completion, recognizing their proficiency in using the ACI system.</p>
<p>This initiative reflects Nafeza's commitment to supporting all stakeholders in the trade ecosystem and ensuring smooth adoption of digital trade procedures. Customs brokers play a crucial role in facilitating trade, and this training program empowers them to serve their clients more effectively.</p>",
                    publishedDate = "2025-08-10",
                    category = "News",
                    imageUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800",
                    author = "Nafeza Training Department",
                    tags = new[] { "Training", "Customs Brokers", "ACI System", "Education" }
                },
                new
                {
                    id = 8,
                    title = "NAFEZA Mobile Application Now Available on iOS and Android",
                    description = "The official Nafeza mobile application is now available for download on both iOS and Android platforms, allowing users to access trade services, track declarations, and receive notifications on the go.",
                    content = @"<p>Nafeza is excited to announce the official launch of its mobile application, now available for download on both iOS and Android platforms. The mobile app brings the power of Nafeza's trade facilitation services directly to users' smartphones and tablets.</p>
<p>The Nafeza mobile app provides users with:</p>
<ul>
<li>Access to all platform services from mobile devices</li>
<li>Real-time tracking of declarations and applications</li>
<li>Push notifications for important updates</li>
<li>Quick access to tariff search and currency rates</li>
<li>Document upload and management capabilities</li>
<li>Secure authentication and e-signature support</li>
</ul>
<p>The app features an intuitive user interface designed for mobile use, ensuring that traders can manage their operations efficiently whether they're in the office or on the go. The application maintains the same high standards of security and data protection as the web platform.</p>
<p>Available features include submitting ACI requests, tracking declaration status, searching tariffs, checking currency rates, and receiving instant notifications about important updates. The mobile app represents Nafeza's commitment to providing convenient and accessible trade services to all users.</p>
<p>Download the Nafeza app today from the App Store or Google Play and experience the convenience of managing your trade operations from anywhere, at any time.</p>",
                    publishedDate = "2025-07-25",
                    category = "News",
                    imageUrl = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800",
                    author = "Nafeza Mobile Team",
                    tags = new[] { "Mobile App", "iOS", "Android", "Mobile Services" }
                },
                new
                {
                    id = 9,
                    title = "Digital Transformation Initiative: Paperless Trade Procedures",
                    description = "Nafeza continues to lead Egypt's digital transformation in foreign trade by implementing paperless procedures, reducing environmental impact and improving operational efficiency across all trade processes.",
                    content = @"<p>Nafeza is at the forefront of Egypt's digital transformation in foreign trade, implementing comprehensive paperless procedures that benefit both businesses and the environment.</p>
<p>The shift to paperless trade procedures has resulted in significant benefits:</p>
<ul>
<li>Elimination of physical document submission requirements</li>
<li>Reduced environmental impact through decreased paper usage</li>
<li>Faster processing times with digital workflows</li>
<li>Enhanced security through digital document management</li>
<li>Improved accessibility and convenience for users</li>
</ul>
<p>All trade-related documents, including declarations, certificates, and supporting documentation, can now be submitted and processed entirely through the Nafeza digital platform. This transformation has not only improved efficiency but also contributed to environmental sustainability by significantly reducing paper consumption.</p>
<p>The paperless initiative aligns with global trends toward digital trade facilitation and positions Egypt as a leader in modern trade procedures. Nafeza continues to work with all stakeholders to ensure smooth transition and maximum benefit from these digital innovations.</p>",
                    publishedDate = "2025-07-12",
                    category = "News",
                    imageUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
                    author = "Nafeza Sustainability Team",
                    tags = new[] { "Digital Transformation", "Paperless", "Sustainability", "Environment" }
                },
                new
                {
                    id = 10,
                    title = "International Recognition: Nafeza Receives Excellence Award for Trade Facilitation",
                    description = "The Nafeza platform has been recognized internationally for excellence in trade facilitation, receiving an award that highlights Egypt's commitment to modernizing its trade infrastructure and improving business processes.",
                    content = @"<p>Nafeza has received international recognition for excellence in trade facilitation, winning a prestigious award that acknowledges the platform's significant contributions to modernizing Egypt's trade infrastructure.</p>
<p>The award recognizes Nafeza's achievements in:</p>
<ul>
<li>Implementing innovative digital trade solutions</li>
<li>Improving trade facilitation and reducing processing times</li>
<li>Enhancing transparency and efficiency in trade procedures</li>
<li>Supporting Egypt's economic development through trade facilitation</li>
</ul>
<p>This recognition reflects the hard work and dedication of the entire Nafeza team, as well as the support and collaboration of all stakeholders in Egypt's trade ecosystem. The award serves as validation of Egypt's commitment to digital transformation and modern trade practices.</p>
<p>Nafeza remains committed to continuous improvement and innovation, building on this recognition to further enhance its services and support Egypt's position as a leader in digital trade facilitation in the region.</p>",
                    publishedDate = "2025-06-30",
                    category = "News",
                    imageUrl = "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
                    author = "Nafeza Communications",
                    tags = new[] { "Award", "Recognition", "Excellence", "International" }
                },
                new
                {
                    id = 11,
                    title = "Workshop on e-Signature Integration with ACI System",
                    description = "A technical workshop was conducted to demonstrate the integration of e-Signature capabilities with the ACI system, enabling secure and legally compliant digital signing of trade documents.",
                    content = @"<p>Nafeza organized a technical workshop focusing on the integration of e-Signature capabilities with the Advance Cargo Information (ACI) system, enabling secure and legally compliant digital signing of trade documents.</p>
<p>The workshop covered essential aspects of e-Signature implementation:</p>
<ul>
<li>Legal framework and compliance requirements</li>
<li>Technical integration with e-Token USB devices</li>
<li>Security measures and best practices</li>
<li>Step-by-step guide to signing documents digitally</li>
<li>Troubleshooting common issues</li>
</ul>
<p>Participants learned how to use e-Token USB devices to sign trade declarations and other documents securely through the Nafeza platform. The e-Signature feature provides the same legal validity as physical signatures while offering enhanced security and convenience.</p>
<p>The workshop emphasized the importance of proper e-Signature implementation in maintaining document integrity and ensuring compliance with legal requirements. Participants gained hands-on experience with the system and received guidance on best practices for secure digital document signing.</p>",
                    publishedDate = "2025-06-18",
                    category = "Events",
                    imageUrl = "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800",
                    author = "Nafeza Technical Team",
                    tags = new[] { "e-Signature", "Workshop", "Security", "e-Token" }
                },
                new
                {
                    id = 12,
                    title = "NAFEZA Annual Conference: Future of Digital Trade in Egypt",
                    description = "The annual Nafeza conference brought together industry leaders, government officials, and trade professionals to discuss the future of digital trade in Egypt and explore opportunities for further innovation and collaboration.",
                    content = @"<p>The Nafeza Annual Conference successfully brought together industry leaders, government officials, trade professionals, and technology experts to discuss the future of digital trade in Egypt.</p>
<p>The conference featured keynote presentations, panel discussions, and interactive sessions covering:</p>
<ul>
<li>Current state and future vision of digital trade in Egypt</li>
<li>Emerging technologies and their impact on trade facilitation</li>
<li>International best practices and lessons learned</li>
<li>Collaboration opportunities between public and private sectors</li>
<li>Challenges and opportunities in the digital trade ecosystem</li>
</ul>
<p>Distinguished speakers from government, industry, and international organizations shared their insights and experiences, providing valuable perspectives on the evolution of digital trade. The conference served as a platform for networking and knowledge exchange among stakeholders.</p>
<p>The event concluded with a commitment to continued collaboration and innovation in advancing Egypt's digital trade capabilities. Participants left with a clearer understanding of the opportunities and challenges ahead, and a shared vision for the future of trade facilitation in Egypt.</p>",
                    publishedDate = "2025-06-05",
                    category = "Events",
                    imageUrl = "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800",
                    author = "Nafeza Conference Team",
                    tags = new[] { "Conference", "Digital Trade", "Future", "Innovation" }
                }
            };
        }

        // GET: api/media/news
        [HttpGet("news")]
        public IActionResult GetNews()
        {
            var allArticles = GetAllNewsArticles();
            
            // Return articles without full content for the list view
            var news = allArticles.Select(a => new
            {
                ((dynamic)a).id,
                ((dynamic)a).title,
                ((dynamic)a).description,
                ((dynamic)a).publishedDate,
                ((dynamic)a).category,
                ((dynamic)a).imageUrl
            }).ToArray();

            var pageContent = new
            {
                title = "Media Center",
                subtitle = "News Page: View the latest news from the Nafeza system here",
                description = "Stay updated with the latest developments, announcements, and events related to the National Single Window for Foreign Trade. Our media center provides comprehensive coverage of Nafeza's initiatives, partnerships, and system enhancements.",
                news = news,
                totalNews = news.Length,
                categories = new[] { "News", "Events", "Announcements" }
            };

            return Ok(pageContent);
        }

        // GET: api/media/news/{id}
        [HttpGet("news/{id}")]
        public IActionResult GetNewsArticle(int id)
        {
            var allArticles = GetAllNewsArticles();
            var article = allArticles.FirstOrDefault(a => ((dynamic)a).id == id);

            if (article == null)
            {
                return NotFound(new { message = "Article not found" });
            }

            return Ok(article);
        }
    }
}
