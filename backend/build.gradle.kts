import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.4.1"
	id("io.spring.dependency-management") version "1.0.10.RELEASE"
	kotlin("jvm") version "1.4.21"
	kotlin("plugin.spring") version "1.4.21"
}

group = "com.planetsf"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
	}
}

repositories {
	mavenCentral()
}

dependencies {
	// spring
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-jdbc")
	implementation("org.springframework:spring-core:5.3.4")
	implementation("org.springframework:spring-context:5.3.4")

	// DB
	implementation("org.postgresql:postgresql")

	// kotlin
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

	// google
	implementation("com.google.code.gson:gson:2.8.2")
	implementation("com.google.api-client:google-api-client:1.31.1")
	implementation("com.google.oauth-client:google-oauth-client-jetty:1.23.0")
	implementation("com.google.apis:google-api-services-calendar:v3-rev305-1.23.0")

	// aws
	implementation(platform("com.amazonaws:aws-java-sdk-bom:1.11.960"))
	implementation("com.amazonaws:aws-java-sdk-s3")

	// etc
	implementation("javax.xml.bind:jaxb-api:2.2.4")
	compileOnly("org.projectlombok:lombok")

	annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
	annotationProcessor("org.projectlombok:lombok")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "11"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
