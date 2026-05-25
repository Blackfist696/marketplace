<div class="container">
    <?php
    $contactInfo = $contactInfo ?? [
        'name' => '',
        'email' => '',
        'phone' => '',
        'address' => '',
        'city' => '',
        'hours' => [],
    ];
    ?>
    <h1>Contactez-nous</h1>
    <p style="font-size: 16px; color: #666; margin-bottom: 30px;">
        Nous sommes à votre écoute ! N'hésitez pas à nous contacter pour toute question ou suggestion.
    </p>

    <div class="contact-grid">
        <!-- Contact Information -->
        <div class="contact-card">
            <h3>📍 Adresse</h3>
            <p>
                <?php echo htmlspecialchars($contactInfo['name']); ?><br>
                <?php echo htmlspecialchars($contactInfo['address']); ?><br>
                <?php echo htmlspecialchars($contactInfo['city']); ?>
            </p>
        </div>

        <!-- Phone -->
        <div class="contact-card">
            <h3>📞 Téléphone</h3>
            <p>
                <a href="tel:<?php echo htmlspecialchars($contactInfo['phone']); ?>" 
                   style="color: #2ecc71; text-decoration: none; font-weight: bold;">
                    <?php echo htmlspecialchars($contactInfo['phone']); ?>
                </a><br>
                <small style="color: #999;">Disponible du lundi au dimanche</small>
            </p>
        </div>

        <!-- Email -->
        <div class="contact-card">
            <h3>✉️ Email</h3>
            <p>
                <a href="mailto:<?php echo htmlspecialchars($contactInfo['email']); ?>" 
                   style="color: #2ecc71; text-decoration: none; font-weight: bold;">
                    <?php echo htmlspecialchars($contactInfo['email']); ?>
                </a><br>
                <small style="color: #999;">Réponse sous 24h</small>
            </p>
        </div>

        <!-- Hours -->
        <div class="contact-card">
            <h3>🕐 Horaires d'ouverture</h3>
            <ul class="hours-list">
                <?php foreach ($contactInfo['hours'] as $hour): ?>
                    <li><?php echo htmlspecialchars($hour); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>
    </div>

    <h2 style="margin-top: 50px;">Formulaire de contact</h2>
    <form method="POST" action="<?php echo app_url('/send-contact'); ?>" style="max-width: 600px; margin-top: 20px;">
        <div style="margin-bottom: 20px;">
            <label for="name" style="display: block; margin-bottom: 5px; font-weight: bold;">Nom *</label>
            <input type="text" id="name" name="name" required 
                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
        </div>

        <div style="margin-bottom: 20px;">
            <label for="email" style="display: block; margin-bottom: 5px; font-weight: bold;">Email *</label>
            <input type="email" id="email" name="email" required 
                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
        </div>

        <div style="margin-bottom: 20px;">
            <label for="phone" style="display: block; margin-bottom: 5px; font-weight: bold;">Téléphone</label>
            <input type="tel" id="phone" name="phone" 
                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
        </div>

        <div style="margin-bottom: 20px;">
            <label for="subject" style="display: block; margin-bottom: 5px; font-weight: bold;">Sujet *</label>
            <input type="text" id="subject" name="subject" required 
                   style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
        </div>

        <div style="margin-bottom: 20px;">
            <label for="message" style="display: block; margin-bottom: 5px; font-weight: bold;">Message *</label>
            <textarea id="message" name="message" rows="6" required 
                      style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px; font-family: inherit;"></textarea>
        </div>

        <button type="submit" class="btn" style="font-size: 16px; padding: 12px 30px;">
            Envoyer le message
        </button>
    </form>

    <h2 style="margin-top: 50px;">Suivez-nous</h2>
    <div style="display: flex; gap: 20px; margin-top: 20px;">
        <a href="#facebook" class="btn" style="text-decoration: none;">Facebook</a>
        <a href="#instagram" class="btn" style="text-decoration: none;">Instagram</a>
        <a href="#twitter" class="btn" style="text-decoration: none;">Twitter</a>
    </div>
</div>
