<xsl:stylesheet version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:template match="/">
		<html>
			<body>
				<h1>
					<xsl:value-of select="//collection/description" />
				</h1>
				<xsl:for-each select="//recipe">
					<div>
                        <caption style = " padding: 10px;"> 
							<h1>
								<xsl:value-of select="title" />
							</h1>
                        </caption>
						<h3>Date: <xsl:value-of select="date" /> </h3>
						
						<h3>Ingredients:</h3>
						<p>
							<xsl:for-each select="ingredient">
								<p>
									<xsl:value-of select="@name" />
										<xsl:text> - </xsl:text>
										<xsl:value-of select="@amount" />
										<xsl:text> </xsl:text>
										<xsl:value-of select="@unit" />
								</p>
							</xsl:for-each>
						</p>
						<h3>Preparation:</h3>
						<p>
							<xsl:for-each select="preparation/step">
								<p>
									<xsl:value-of select="." />
								</p>
							</xsl:for-each>
						</p>
							<h3>Comment:</h3>
							<p>
							<xsl:value-of select="comment" />
							</p>
							
						<h3>Nutrition: </h3>
							<xsl:text>Calories: </xsl:text>
							<xsl:value-of select="nutrition/@calories" />
							<xsl:text>, </xsl:text>
							<xsl:text>Fat: </xsl:text>
							<xsl:value-of select="nutrition/@fat" />
							<xsl:text>, </xsl:text>
							<xsl:text>Carbohydrates: </xsl:text>
							<xsl:value-of select="nutrition/@carbohydrates" />
							<xsl:text>, </xsl:text>
							<xsl:text>Protein: </xsl:text>
							<xsl:value-of select="nutrition/@protein" />
							<xsl:text>, Alcohol: </xsl:text>
							<xsl:value-of select="nutrition/@alcohol" />
						<br />
					</div>
				</xsl:for-each>
			</body>
		</html>
	</xsl:template>
</xsl:stylesheet>