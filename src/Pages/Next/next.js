export const projectData = [
    {
        id: 4,
        title: "Pipeline CI/CD con Terraform y Kubernetes",
        description: "Implementación de una infraestructura como código (IaC) usando Terraform para provisionar un clúster Kubernetes (EKS/AKS) en AWS/Azure. El pipeline automatiza la construcción de la imagen Docker de la aplicación y su despliegue continuo mediante GitHub Actions.",
        image: "https://placehold.co/400x250/3f51b5/ffffff?text=CI/CD+K8s+IaC",
        tech: ["Terraform", "Kubernetes", "Docker", "GitHub Actions", "AWS/Azure", "Bash"],
        link: "/projects/iac-ci-cd",
        github: "https://github.com/[TuUsuario]/iac-devops-pipeline" 
    },
    {
        id: 5,
        title: "ETL de Big Data con Spark y Cloud Storage",
        description: "Diseño y construcción de un Data Pipeline para el procesamiento de grandes volúmenes de datos. Se utilizó Python y Apache Spark para la transformación, y el almacenamiento final se realizó en un Data Warehouse en la nube (ej. Azure Synapse o AWS Redshift).",
        image: "https://placehold.co/400x250/e91e63/ffffff?text=DATA+PIPELINE",
        tech: ["Python", "Apache Spark", "SQL", "AWS S3/Azure Blob", "PostgreSQL"],
        link: "/projects/big-data-etl",
        github: "https://github.com/[TuUsuario]/spark-data-pipeline" 
    },
    {
        id: 6,
        title: "Hardening de Servidor Linux y Monitoreo de Red",
        description: "Configuración de un servidor virtual (RHCSA/Linux) con políticas de seguridad avanzadas (FirewallD, SELinux). Se implementó un sistema de monitoreo de red (ej. Prometheus/Grafana) para la salud del sistema y alertas de seguridad, aplicando principios CCNA y Ciberseguridad.",
        image: "https://placehold.co/400x250/4CAF50/ffffff?text=LINUX+SECURITY",
        tech: ["Linux (RHCSA)", "Bash Scripting", "Prometheus/Grafana", "Ciberseguridad", "CCNA"],
        link: "/projects/linux-hardening",
        github: "https://github.com/[TuUsuario]/linux-security-lab" 
    },
];
